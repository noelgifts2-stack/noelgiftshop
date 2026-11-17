import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase/server';
import { OrderData } from '@/types';
import { AdminOrder } from '@/types/admin';
import { saveOrder, getOrder, addAuditLog, addNotification, getOrders } from '@/lib/adminStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const ref = searchParams.get('ref');

    if (ref) {
      const order = getOrder(ref.trim().toUpperCase());
      if (!order) {
        return NextResponse.json({ success: false, message: 'Commande introuvable' }, { status: 404 });
      }
      return NextResponse.json({ success: true, order });
    }

    // Sans ref, retourne la liste (pour utilisation interne)
    const orders = getOrders();
    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();

    // 1. Sauvegarde dans le store admin persistant
    const adminOrder: AdminOrder = {
      id: `ord_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      orderReference: orderData.orderReference,
      status: 'pending_verification',
      customer: orderData.customer,
      items: orderData.items,
      paymentMethod: orderData.paymentMethod,
      paymentProofUrl: orderData.paymentProofUrl,
      paymentProofName: orderData.paymentProofUrl ? 'Justificatif_client.png' : undefined,
      giftCardCode: orderData.giftCardCode,
      subtotal: orderData.subtotal,
      shipping: orderData.shipping,
      discount: orderData.discount,
      promoCode: orderData.promoCode,
      total: orderData.total,
      currency: orderData.currency,
      locale: orderData.locale,
      createdAt: orderData.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    saveOrder(adminOrder);

    // 2. Traçabilité (Journal d'audit)
    addAuditLog({
      actor: "Client (" + orderData.customer.fullName + ")",
      action: "ORDER_CREATED",
      targetType: "order",
      targetId: adminOrder.id,
      targetReference: adminOrder.orderReference,
      details: `Nouvelle commande enregistrée pour un montant de ${orderData.total.toFixed(2)} ${orderData.currency} (${orderData.paymentMethod}). Justificatif : ${orderData.paymentProofUrl ? 'Attaché' : 'Aucun'}.`
    });

    // 3. Notification pour l'équipe Admin
    addNotification({
      title: orderData.paymentProofUrl ? "Nouveau paiement à vérifier" : "Nouvelle commande enregistrée",
      message: `${orderData.customer.fullName} a passé commande (${adminOrder.orderReference}) pour ${orderData.total.toFixed(2)} ${orderData.currency}.`,
      type: orderData.paymentProofUrl ? "payment" : "order",
      orderReference: adminOrder.orderReference
    });

    // 4. Tentative d'enregistrement dans Supabase si configuré
    try {
      const supabase = createServerClient();
      await supabase.from('orders').insert({
        order_reference: orderData.orderReference,
        locale: orderData.locale,
        currency: orderData.currency,
        customer_name: orderData.customer.fullName,
        customer_email: orderData.customer.email,
        customer_phone: orderData.customer.phone,
        country: orderData.customer.country,
        city: orderData.customer.city,
        postal_code: orderData.customer.postalCode,
        shipping_address: orderData.customer.address,
        gift_note: orderData.customer.giftNote,
        payment_method: orderData.paymentMethod,
        gift_card_code: orderData.giftCardCode,
        proof_url: orderData.paymentProofUrl,
        subtotal: orderData.subtotal,
        shipping_cost: orderData.shipping,
        discount_amount: orderData.discount,
        promo_code: orderData.promoCode,
        total: orderData.total,
        status: 'pending_verification'
      });
    } catch (e) {
      // Supabase optionnel
    }

    return NextResponse.json({
      success: true,
      message: 'Commande enregistrée avec succès',
      orderReference: orderData.orderReference
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: error?.message || 'Failed to process order'
    }, { status: 500 });
  }
}
