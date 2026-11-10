/**
 * NOËL GIFT SHOP - Store State Management
 * Gère le panier, la liste d'envies (favoris), les codes promos et les événements
 */

const Store = {
  // Constantes
  SHIPPING_THRESHOLD: 50000, // Livraison offerte dès 50 000 FCFA
  STANDARD_SHIPPING_FEE: 2500, // 2 500 FCFA sinon
  WHATSAPP_NUMBER: "+22997001122", // Numéro WhatsApp officiel de la boutique

  // État initial
  state: {
    cart: [],
    wishlist: [],
    promoCode: null,
    discountAmount: 0,
    giftPackaging: false,
    giftNote: "",
    snowActive: true
  },

  listeners: [],

  // Initialisation
  init() {
    try {
      const savedCart = localStorage.getItem("nlg_cart");
      if (savedCart) this.state.cart = JSON.parse(savedCart);

      const savedWishlist = localStorage.getItem("nlg_wishlist");
      if (savedWishlist) this.state.wishlist = JSON.parse(savedWishlist);

      const savedSnow = localStorage.getItem("nlg_snow");
      if (savedSnow !== null) this.state.snowActive = JSON.parse(savedSnow);
    } catch (e) {
      console.warn("Storage access failed", e);
    }
    this.notify();
  },

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(cb => cb !== callback);
    };
  },

  notify() {
    this.save();
    this.listeners.forEach(cb => cb(this.state));
  },

  save() {
    try {
      localStorage.setItem("nlg_cart", JSON.stringify(this.state.cart));
      localStorage.setItem("nlg_wishlist", JSON.stringify(this.state.wishlist));
      localStorage.setItem("nlg_snow", JSON.stringify(this.state.snowActive));
    } catch (e) {}
  },

  // Formatter FCFA
  formatPrice(num) {
    if (typeof num !== "number") num = Number(num) || 0;
    return new Intl.NumberFormat("fr-FR").format(Math.round(num)) + " FCFA";
  },

  // GESTION PANIER
  addToCart(product, options = {}, quantity = 1) {
    const selectedColor = options.color || (product.options?.colors ? product.options.colors[0] : null);
    const selectedSize = options.size || (product.options?.sizes ? product.options.sizes[0] : null);
    const selectedModel = options.model || (product.options?.models ? product.options.models[0] : null);

    const itemKey = `${product.id}_${selectedColor || ''}_${selectedSize || ''}_${selectedModel || ''}`;
    const existingIndex = this.state.cart.findIndex(item => item.key === itemKey);

    if (existingIndex > -1) {
      this.state.cart[existingIndex].quantity += quantity;
    } else {
      this.state.cart.push({
        key: itemKey,
        productId: product.id,
        name: product.name,
        price: product.price,
        oldPrice: product.oldPrice,
        image: product.images[0],
        color: selectedColor,
        size: selectedSize,
        model: selectedModel,
        quantity: quantity
      });
    }

    this.notify();
    this.showToast(`✨ « ${product.name} » a été ajouté à votre hotte de Noël !`);
  },

  removeFromCart(itemKey) {
    this.state.cart = this.state.cart.filter(item => item.key !== itemKey);
    this.notify();
    this.showToast("Article retiré du panier");
  },

  updateQuantity(itemKey, delta) {
    const item = this.state.cart.find(i => i.key === itemKey);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(itemKey);
    } else {
      this.notify();
    }
  },

  clearCart() {
    this.state.cart = [];
    this.state.promoCode = null;
    this.state.discountAmount = 0;
    this.notify();
  },

  getCartCount() {
    return this.state.cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartSubtotal() {
    return this.state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  },

  getShippingCost() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    return subtotal >= this.SHIPPING_THRESHOLD ? 0 : this.STANDARD_SHIPPING_FEE;
  },

  getCartTotal() {
    const subtotal = this.getCartSubtotal();
    if (subtotal === 0) return 0;
    const shipping = this.getShippingCost();
    const total = Math.max(0, subtotal - this.state.discountAmount + shipping);
    return total;
  },

  applyPromo(code) {
    const cleanCode = (code || "").trim().toUpperCase();
    if (!cleanCode) return { success: false, message: "Veuillez entrer un code promo." };

    const subtotal = this.getCartSubtotal();
    if (subtotal <= 0) return { success: false, message: "Votre panier est vide." };

    if (cleanCode === "NOEL2026") {
      const discount = Math.round(subtotal * 0.15); // -15%
      this.state.promoCode = cleanCode;
      this.state.discountAmount = discount;
      this.notify();
      return { success: true, message: `Code NOEL2026 appliqué : -15% (${this.formatPrice(discount)}) ! 🎁` };
    } else if (cleanCode === "MAGIE") {
      const discount = 5000;
      this.state.promoCode = cleanCode;
      this.state.discountAmount = Math.min(subtotal, discount);
      this.notify();
      return { success: true, message: `Code MAGIE appliqué : -5 000 FCFA offerts ! 🎄` };
    } else {
      return { success: false, message: "Code promo invalide ou expiré." };
    }
  },

  removePromo() {
    this.state.promoCode = null;
    this.state.discountAmount = 0;
    this.notify();
  },

  setGiftOptions(packaging, note) {
    this.state.giftPackaging = packaging;
    this.state.giftNote = note || "";
    this.notify();
  },

  // FAVORIS / WISHLIST
  toggleWishlist(productId) {
    const index = this.state.wishlist.indexOf(productId);
    const prod = PRODUCTS.find(p => p.id === productId);
    const title = prod ? prod.name : "Article";

    if (index > -1) {
      this.state.wishlist.splice(index, 1);
      this.showToast(`Retiré de vos favoris`);
    } else {
      this.state.wishlist.push(productId);
      this.showToast(`💖 « ${title} » ajouté à vos favoris de Noël !`);
    }
    this.notify();
  },

  isInWishlist(productId) {
    return this.state.wishlist.includes(productId);
  },

  // TOGGLE NEIGE
  toggleSnow() {
    this.state.snowActive = !this.state.snowActive;
    this.notify();
    const snowContainer = document.getElementById("snow-canvas");
    if (snowContainer) {
      snowContainer.style.display = this.state.snowActive ? "block" : "none";
    }
    this.showToast(this.state.snowActive ? "❄️ Flocons de neige activés !" : "Flocons désactivés");
  },

  // TOAST NOTIFICATIONS
  showToast(message, type = "success") {
    let container = document.getElementById("toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "toast-container";
      container.className = "fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = `transform translate-y-2 opacity-0 transition-all duration-300 pointer-events-auto bg-[#14532D] text-white px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-[#F4C542]/40 text-sm font-medium`;
    toast.innerHTML = `
      <span class="text-[#F4C542] text-lg">🎁</span>
      <span class="flex-1">${message}</span>
    `;

    container.appendChild(toast);
    requestAnimationFrame(() => {
      toast.classList.remove("translate-y-2", "opacity-0");
    });

    setTimeout(() => {
      toast.classList.add("opacity-0", "translate-y-2");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  },

  // GÉNÉRATEUR LIEN WHATSAPP DIRECT POUR COMMANDE
  generateWhatsAppLink(orderData = null, singleProduct = null) {
    let text = "";
    if (singleProduct) {
      text = `Bonjour NOËL GIFT SHOP ! 🎅\nJe souhaite commander directement cet article :\n\n` +
        `🎁 *${singleProduct.name}*\n` +
        `💰 Prix : ${this.formatPrice(singleProduct.price)}\n` +
        `🔗 Réf : ${singleProduct.id}\n\n` +
        `Pourriez-vous me confirmer la disponibilité et les modalités de livraison ? Merci !`;
    } else if (orderData) {
      text = `Bonjour NOËL GIFT SHOP ! 🎄\nJe viens de finaliser ma commande sur votre boutique en ligne :\n\n` +
        `📦 *Numéro de commande :* ${orderData.orderId}\n` +
        `👤 *Client :* ${orderData.fullName} (${orderData.phone})\n` +
        `📍 *Adresse de livraison :* ${orderData.city}, ${orderData.address}\n` +
        `💳 *Mode de paiement :* ${orderData.paymentMethod}\n\n` +
        `🛒 *Articles commandés :*\n` +
        orderData.items.map(i => `- ${i.quantity}x ${i.name} (${this.formatPrice(i.price)})`).join("\n") +
        `\n\n💰 *TOTAL : ${this.formatPrice(orderData.total)}*\n` +
        (orderData.giftNote ? `🎁 *Mot doux de Noël :* "${orderData.giftNote}"\n` : "") +
        `\nMerci de me recontacter pour la livraison ! ✨`;
    } else {
      text = `Bonjour NOËL GIFT SHOP ! 🎅 J'ai une question concernant vos cadeaux et livraisons pour les fêtes de fin d'année.`;
    }

    return `https://wa.me/${this.WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  }
};

window.Store = Store;
