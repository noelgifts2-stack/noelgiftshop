import fs from 'fs';
import path from 'path';
import { Product } from '@/types';
import { PRODUCTS } from '@/data/products';
import { AdminOrder, AuditLogEntry, AdminNotification, OrderStatus } from '@/types/admin';

// Répertoire de stockage local persistant
const DATA_DIR = path.join(process.cwd(), 'data');
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_OVERRIDE_FILE = path.join(DATA_DIR, 'product_overrides.json');
const AUDIT_FILE = path.join(DATA_DIR, 'audit_log.json');
const NOTIFICATIONS_FILE = path.join(DATA_DIR, 'notifications.json');

// Mémoire cache pour le runtime
let ordersCache: AdminOrder[] | null = null;
let productOverridesCache: Record<string, Partial<Product> & { deleted?: boolean }> | null = null;
let customProductsCache: Product[] | null = null;
let auditLogsCache: AuditLogEntry[] | null = null;
let notificationsCache: AdminNotification[] | null = null;

function ensureDataDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (err) {
    // Si l'environnement de build / serverless est en lecture seule, on utilise la mémoire
  }
}

function safeReadJSON<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(content) as T;
    }
  } catch (err) {
    console.warn(`Erreur lecture ${filePath}:`, err);
  }
  return fallback;
}

function safeWriteJSON(filePath: string, data: any) {
  try {
    ensureDataDir();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    // Serverless fallback
  }
}

// ----------------------------------------------------
// DONNÉES INITIALES RÉALISTES
// ----------------------------------------------------
const INITIAL_ORDERS: AdminOrder[] = [
  {
    id: "ord_101",
    orderReference: "NLG-2026-8942",
    status: "payment_verified",
    customer: {
      fullName: "Éléonore de Montmirail",
      email: "eleonore.montmirail@gmail.com",
      phone: "+33 6 42 19 88 04",
      country: "FR",
      city: "Versailles",
      postalCode: "78000",
      address: "14 Boulevard de la Reine",
      giftPackaging: true,
      giftNote: "Joyeux Noël à notre fille adorée ! De la part de Maman et Papa."
    },
    items: [
      {
        key: "prod-mode-01-M",
        productId: "prod-mode-01",
        name: "Pull Jacquard Flocon Noël en Laine Mérinos",
        price: 89.90,
        quantity: 1,
        currency: "EUR",
        image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80",
        size: "M"
      },
      {
        key: "prod-coff-01-default",
        productId: "prod-coff-01",
        name: "Coffret Terroir Gastronomie Périgord Prestige",
        price: 119.00,
        quantity: 1,
        currency: "EUR",
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=800&q=80"
      }
    ],
    paymentMethod: "bank_transfer",
    paymentProofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    paymentProofName: "Virement_Bancaire_NLG8942_BNP.pdf",
    subtotal: 208.90,
    shipping: 0,
    discount: 0,
    total: 208.90,
    currency: "EUR",
    locale: "fr",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    paymentVerifiedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    paymentVerifiedBy: "Administrateur",
    adminNotes: "Virement SEPA reçu et validé sur le compte professionnel. Prêt pour expédition Colissimo."
  },
  {
    id: "ord_102",
    orderReference: "NLG-2026-7319",
    status: "pending_verification",
    customer: {
      fullName: "Jean-Baptiste Lemoine",
      email: "jb.lemoine@outlook.fr",
      phone: "+33 7 81 22 45 90",
      country: "FR",
      city: "Lyon",
      postalCode: "69002",
      address: "28 Rue de la République",
      giftPackaging: true,
      giftNote: "Pour passer un hiver bien au chaud !"
    },
    items: [
      {
        key: "prod-high-01-default",
        productId: "prod-high-01",
        name: "Enceinte Rétro Vintage Bluetooth Bois & Laiton",
        price: 149.00,
        quantity: 1,
        currency: "EUR",
        image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80"
      }
    ],
    paymentMethod: "bank_transfer",
    paymentProofUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    paymentProofName: "Ordre_Virement_Banque_Populaire.png",
    subtotal: 149.00,
    shipping: 0,
    discount: 0,
    total: 149.00,
    currency: "EUR",
    locale: "fr",
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 1).toISOString()
  },
  {
    id: "ord_103",
    orderReference: "NLG-2026-6401",
    status: "shipping_started",
    customer: {
      fullName: "Sophie Vandermeersch",
      email: "sophie.vdm@skynet.be",
      phone: "+32 470 55 12 34",
      country: "FR",
      city: "Lille",
      postalCode: "59000",
      address: "5 Avenue du Peuple Belge",
      giftPackaging: false
    },
    items: [
      {
        key: "prod-beau-01-default",
        productId: "prod-beau-01",
        name: "Coffret Soins Précieux Rose & Or Impérial",
        price: 79.50,
        quantity: 1,
        currency: "EUR",
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80"
      }
    ],
    paymentMethod: "gift_card",
    giftCardCode: "NOEL-GIFT-8910-2026",
    paymentProofUrl: "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=800&q=80",
    paymentProofName: "Carte_Cadeau_Scanne_Prive.jpg",
    subtotal: 79.50,
    shipping: 0,
    discount: 0,
    total: 79.50,
    currency: "EUR",
    locale: "fr",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    paymentVerifiedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    paymentVerifiedBy: "Administrateur",
    shippingStartedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    shippingCarrier: "Colissimo Suivi",
    trackingNumber: "6A28901847192",
    trackingUrl: "https://www.laposte.fr/outils/suivre-vos-envois?code=6A28901847192",
    adminNotes: "Colis remis au centre de tri Colissimo de Lille."
  },
  {
    id: "ord_104",
    orderReference: "NLG-2026-5290",
    status: "delivered",
    customer: {
      fullName: "Lucas Tremblay",
      email: "l.tremblay@videotron.ca",
      phone: "+1 514 890 2234",
      country: "CA",
      city: "Montréal",
      postalCode: "H2X 1Y4",
      address: "3480 Rue Saint-Denis",
      giftPackaging: true,
      giftNote: "Joyeuses Fêtes depuis le Québec !"
    },
    items: [
      {
        key: "prod-chaus-01-42",
        productId: "prod-chaus-01",
        name: "Bottines Chelsea Cuir Brun Artisanal",
        price: 179.00,
        quantity: 1,
        currency: "CAD",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80",
        size: "42"
      }
    ],
    paymentMethod: "bank_transfer",
    paymentProofUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80",
    paymentProofName: "Releve_Interac_Transfer.pdf",
    subtotal: 179.00,
    shipping: 0,
    discount: 0,
    total: 179.00,
    currency: "CAD",
    locale: "fr",
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    paymentVerifiedAt: new Date(Date.now() - 3600000 * 60).toISOString(),
    paymentVerifiedBy: "Administrateur",
    shippingStartedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    shippingCarrier: "DHL Express Worldwide",
    trackingNumber: "DHL982741920CA",
    trackingUrl: "https://www.dhl.com/ca-en/home/tracking/tracking-express.html?submit=1&tracking-id=DHL982741920CA",
    deliveredAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    adminNotes: "Livré en main propre contre signature à Montréal."
  }
];

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "log_1",
    timestamp: new Date(Date.now() - 3600000 * 8).toISOString(),
    actor: "Admin Principal",
    action: "START_SHIPPING",
    targetType: "order",
    targetId: "ord_103",
    targetReference: "NLG-2026-6401",
    details: "Expédition lancée via Colissimo Suivi (N° 6A28901847192)."
  },
  {
    id: "log_2",
    timestamp: new Date(Date.now() - 3600000 * 18).toISOString(),
    actor: "Admin Principal",
    action: "VERIFY_PAYMENT",
    targetType: "order",
    targetId: "ord_103",
    targetReference: "NLG-2026-6401",
    details: "Carte cadeau validée avec succès pour un montant de 79.50 €."
  },
  {
    id: "log_3",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actor: "Admin Principal",
    action: "VERIFY_PAYMENT",
    targetType: "order",
    targetId: "ord_101",
    targetReference: "NLG-2026-8942",
    details: "Preuve de virement bancaire SEPA examinée et confirmée."
  },
  {
    id: "log_4",
    timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
    actor: "Système",
    action: "ORDER_CREATED",
    targetType: "order",
    targetId: "ord_102",
    targetReference: "NLG-2026-7319",
    details: "Nouvelle commande enregistrée par Jean-Baptiste Lemoine avec justificatif joint."
  }
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif_1",
    title: "Preuve de paiement à vérifier",
    message: "Jean-Baptiste Lemoine a soumis un justificatif de virement pour la commande NLG-2026-7319 (149.00 €).",
    type: "payment",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 1).toISOString(),
    orderReference: "NLG-2026-7319"
  },
  {
    id: "notif_2",
    title: "Commande prête pour expédition",
    message: "La commande NLG-2026-8942 a été vérifiée et est en attente d'expédition.",
    type: "shipping",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    orderReference: "NLG-2026-8942"
  },
  {
    id: "notif_3",
    title: "Livraison confirmée",
    message: "Le colis DHL982741920CA pour la commande NLG-2026-5290 a été marqué comme livré.",
    type: "shipping",
    read: true,
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    orderReference: "NLG-2026-5290"
  }
];

// ----------------------------------------------------
// COMMANDES (ORDERS)
// ----------------------------------------------------
export function getOrders(): AdminOrder[] {
  if (!ordersCache) {
    ordersCache = safeReadJSON<AdminOrder[]>(ORDERS_FILE, INITIAL_ORDERS);
  }
  return ordersCache;
}

export function getOrder(referenceOrId: string): AdminOrder | undefined {
  const orders = getOrders();
  return orders.find(o => o.orderReference === referenceOrId || o.id === referenceOrId);
}

export function saveOrder(order: AdminOrder): void {
  const orders = getOrders();
  const existingIndex = orders.findIndex(o => o.orderReference === order.orderReference || o.id === order.id);
  if (existingIndex >= 0) {
    orders[existingIndex] = { ...orders[existingIndex], ...order, updatedAt: new Date().toISOString() };
  } else {
    orders.unshift(order);
  }
  ordersCache = orders;
  safeWriteJSON(ORDERS_FILE, ordersCache);
}

export function updateOrderStatus(
  orderReference: string, 
  updateData: {
    status: OrderStatus;
    shippingCarrier?: string;
    trackingNumber?: string;
    trackingUrl?: string;
    adminNotes?: string;
  },
  actor: string = "Admin Principal"
): AdminOrder | null {
  const orders = getOrders();
  const order = orders.find(o => o.orderReference === orderReference);
  if (!order) return null;

  const prevStatus = order.status;
  order.status = updateData.status;
  order.updatedAt = new Date().toISOString();

  let action: AuditLogEntry['action'] = 'UPDATE_ORDER_NOTES';
  let details = `Statut mis à jour de ${prevStatus} à ${updateData.status}.`;

  if (updateData.status === 'payment_verified') {
    order.paymentVerifiedAt = new Date().toISOString();
    order.paymentVerifiedBy = actor;
    action = 'VERIFY_PAYMENT';
    details = `Paiement vérifié avec succès par ${actor}. Preuve de paiement validée.`;
    
    // Notification
    addNotification({
      title: "Paiement validé",
      message: `Paiement validé pour la commande ${orderReference}. Vous pouvez maintenant lancer l'expédition.`,
      type: "payment",
      orderReference
    });
  } else if (updateData.status === 'shipping_started') {
    order.shippingStartedAt = new Date().toISOString();
    if (updateData.shippingCarrier) order.shippingCarrier = updateData.shippingCarrier;
    if (updateData.trackingNumber) order.trackingNumber = updateData.trackingNumber;
    if (updateData.trackingUrl) {
      order.trackingUrl = updateData.trackingUrl;
    } else if (updateData.trackingNumber) {
      // Génération de lien de suivi automatique intelligent
      if (order.shippingCarrier?.toLowerCase().includes('colissimo') || order.shippingCarrier?.toLowerCase().includes('poste')) {
        order.trackingUrl = `https://www.laposte.fr/outils/suivre-vos-envois?code=${updateData.trackingNumber}`;
      } else if (order.shippingCarrier?.toLowerCase().includes('chronopost')) {
        order.trackingUrl = `https://www.chronopost.fr/tracking-no-cms/suivi-page?listeNumerosLT=${updateData.trackingNumber}`;
      } else if (order.shippingCarrier?.toLowerCase().includes('dhl')) {
        order.trackingUrl = `https://www.dhl.com/fr-fr/home/suivi.html?tracking-id=${updateData.trackingNumber}`;
      } else if (order.shippingCarrier?.toLowerCase().includes('ups')) {
        order.trackingUrl = `https://www.ups.com/track?tracknum=${updateData.trackingNumber}`;
      } else if (order.shippingCarrier?.toLowerCase().includes('mondial')) {
        order.trackingUrl = `https://www.mondialrelay.fr/suivi-de-colis?numeroExpedition=${updateData.trackingNumber}`;
      }
    }
    action = 'START_SHIPPING';
    details = `Expédition lancée via ${order.shippingCarrier || 'Transporteur Express'} (N° ${order.trackingNumber || 'En cours'}). Notification de livraison activée pour le client.`;
    
    // Notification
    addNotification({
      title: "Expédition lancée",
      message: `Livraison lancée pour la commande ${orderReference} (${order.shippingCarrier} - ${order.trackingNumber}).`,
      type: "shipping",
      orderReference
    });
  } else if (updateData.status === 'delivered') {
    order.deliveredAt = new Date().toISOString();
    action = 'MARK_DELIVERED';
    details = `Colis marqué comme livré à destination pour ${order.customer.fullName}.`;
  } else if (updateData.status === 'cancelled') {
    action = 'CANCEL_ORDER';
    details = `Commande annulée par ${actor}.`;
  }

  if (updateData.adminNotes !== undefined) {
    order.adminNotes = updateData.adminNotes;
  }

  saveOrder(order);

  // Journalisation d'audit
  addAuditLog({
    actor,
    action,
    targetType: 'order',
    targetId: order.id,
    targetReference: order.orderReference,
    details
  });

  return order;
}

// ----------------------------------------------------
// PRODUITS (PRODUCTS OVERRIDES & ADDITIONS)
// ----------------------------------------------------
function getProductOverrides(): Record<string, Partial<Product> & { deleted?: boolean }> {
  if (!productOverridesCache) {
    productOverridesCache = safeReadJSON(PRODUCTS_OVERRIDE_FILE, {});
  }
  return productOverridesCache!;
}

export function getAllProducts(): Product[] {
  const overrides = getProductOverrides();
  
  // Appliquer les overrides sur les 390 produits existants
  const baseProducts = PRODUCTS.map(p => {
    if (overrides[p.id]) {
      return { ...p, ...overrides[p.id] };
    }
    return p;
  }).filter(p => !overrides[p.id]?.deleted);

  // Ajouter les nouveaux produits créés manuellement par l'admin
  const customProducts = Object.values(overrides).filter(
    (item: any) => item._isNewCustom && !item.deleted
  ) as Product[];

  return [...customProducts, ...baseProducts];
}

export function getProductById(id: string): Product | undefined {
  return getAllProducts().find(p => p.id === id);
}

export function saveProduct(productData: Partial<Product> & { id: string }, actor: string = "Admin"): Product {
  const overrides = getProductOverrides();
  const existing = PRODUCTS.find(p => p.id === productData.id) || overrides[productData.id];

  const isNew = !existing;
  const targetSku = productData.sku || existing?.sku || `SKU-${Date.now().toString().slice(-6)}`;
  
  const updatedProduct = {
    ...(existing || {}),
    ...productData,
    _isNewCustom: isNew || (existing as any)?._isNewCustom
  };

  overrides[productData.id] = updatedProduct;
  productOverridesCache = overrides;
  safeWriteJSON(PRODUCTS_OVERRIDE_FILE, overrides);

  addAuditLog({
    actor,
    action: isNew ? 'CREATE_PRODUCT' : 'UPDATE_PRODUCT',
    targetType: 'product',
    targetId: productData.id,
    targetReference: `${targetSku} - ${productData.title?.fr || (existing?.title as any)?.fr || 'Produit'}`,
    details: isNew ? `Création du nouveau produit avec stock de ${productData.stock ?? 10} unités.` : `Mise à jour des informations et/ou visuels du produit.`
  });

  return updatedProduct as Product;
}

export function toggleProductAvailability(productId: string, actor: string = "Admin"): { success: boolean; availability: string; stock: number } {
  const product = getProductById(productId);
  if (!product) return { success: false, availability: 'out_of_stock', stock: 0 };

  const newAvailability = product.availability === 'in_stock' ? 'out_of_stock' : 'in_stock';
  const newStock = newAvailability === 'in_stock' ? (product.stock > 0 ? product.stock : 15) : 0;

  saveProduct({
    id: productId,
    availability: newAvailability,
    stock: newStock
  }, actor);

  addAuditLog({
    actor,
    action: 'TOGGLE_AVAILABILITY',
    targetType: 'product',
    targetId: productId,
    targetReference: `${product.sku} - ${product.title.fr}`,
    details: `Statut modifié en "${newAvailability === 'in_stock' ? 'Disponible (En stock)' : 'Vendu / Indisponible'}" (Stock: ${newStock}).`
  });

  return { success: true, availability: newAvailability, stock: newStock };
}

export function deleteProduct(productId: string, actor: string = "Admin"): boolean {
  const overrides = getProductOverrides();
  const product = getProductById(productId);
  if (!product) return false;

  overrides[productId] = {
    ...overrides[productId],
    deleted: true
  };

  productOverridesCache = overrides;
  safeWriteJSON(PRODUCTS_OVERRIDE_FILE, overrides);

  addAuditLog({
    actor,
    action: 'DELETE_PRODUCT',
    targetType: 'product',
    targetId: productId,
    targetReference: `${product.sku} - ${product.title.fr}`,
    details: `Suppression du produit du catalogue actif.`
  });

  return true;
}

// ----------------------------------------------------
// TRAÇABILITÉ (AUDIT LOGS)
// ----------------------------------------------------
export function getAuditLogs(): AuditLogEntry[] {
  if (!auditLogsCache) {
    auditLogsCache = safeReadJSON<AuditLogEntry[]>(AUDIT_FILE, INITIAL_AUDIT_LOGS);
  }
  return auditLogsCache;
}

export function addAuditLog(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
  const logs = getAuditLogs();
  const newEntry: AuditLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
    ...entry
  };
  logs.unshift(newEntry);
  auditLogsCache = logs;
  safeWriteJSON(AUDIT_FILE, logs);
  return newEntry;
}

// ----------------------------------------------------
// NOTIFICATIONS
// ----------------------------------------------------
export function getNotifications(): AdminNotification[] {
  if (!notificationsCache) {
    notificationsCache = safeReadJSON<AdminNotification[]>(NOTIFICATIONS_FILE, INITIAL_NOTIFICATIONS);
  }
  return notificationsCache;
}

export function addNotification(notification: Omit<AdminNotification, 'id' | 'createdAt' | 'read'>): AdminNotification {
  const notifications = getNotifications();
  const newNotif: AdminNotification = {
    id: `notif_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    createdAt: new Date().toISOString(),
    read: false,
    ...notification
  };
  notifications.unshift(newNotif);
  notificationsCache = notifications;
  safeWriteJSON(NOTIFICATIONS_FILE, notifications);
  return newNotif;
}

export function markNotificationAsRead(id: string): boolean {
  const notifications = getNotifications();
  const notif = notifications.find(n => n.id === id);
  if (notif) {
    notif.read = true;
    notificationsCache = notifications;
    safeWriteJSON(NOTIFICATIONS_FILE, notifications);
    return true;
  }
  return false;
}

export function markAllNotificationsAsRead(): void {
  const notifications = getNotifications();
  notifications.forEach(n => { n.read = true; });
  notificationsCache = notifications;
  safeWriteJSON(NOTIFICATIONS_FILE, notifications);
}
