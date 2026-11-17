import { NextRequest, NextResponse } from 'next/server';
import { getOrders, updateOrderStatus, getOrder } from '@/lib/adminStore';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search')?.toLowerCase();

    let orders = getOrders();

    if (status && status !== 'all') {
      orders = orders.filter(o => o.status === status);
    }

    if (search) {
      orders = orders.filter(o => 
        o.orderReference.toLowerCase().includes(search) ||
        o.customer.fullName.toLowerCase().includes(search) ||
        o.customer.email.toLowerCase().includes(search) ||
        o.customer.phone.toLowerCase().includes(search)
      );
    }

    return NextResponse.json({ success: true, orders });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderReference, status, shippingCarrier, trackingNumber, trackingUrl, adminNotes, actor } = body;

    if (!orderReference || !status) {
      return NextResponse.json({ success: false, message: 'orderReference et status requis' }, { status: 400 });
    }

    const updatedOrder = updateOrderStatus(
      orderReference,
      {
        status,
        shippingCarrier,
        trackingNumber,
        trackingUrl,
        adminNotes
      },
      actor || "Admin Principal"
    );

    if (!updatedOrder) {
      return NextResponse.json({ success: false, message: 'Commande introuvable' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: 'Commande mise à jour avec succès',
      order: updatedOrder
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
