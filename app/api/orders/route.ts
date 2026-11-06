import { NextRequest, NextResponse } from 'next/server';
import { getOrders, saveOrder, getProductById, saveProduct } from '@/lib/db';
import { Order } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    let orders = await getOrders();

    if (email) {
      orders = orders.filter((o) => o.customer.email.toLowerCase() === email.toLowerCase());
    }

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const orderId = `ord-${Date.now()}`;
    const orderNumber = `SH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const trackingNumber = `DELHIVERY-${Math.floor(10000000 + Math.random() * 90000000)}`;

    const now = new Date();
    const estimatedDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
    const estimatedDelivery = estimatedDate.toISOString().split('T')[0];

    const formattedNow = now.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: orderId,
      orderNumber,
      customer: body.customer,
      items: body.items,
      subtotal: Number(body.subtotal) || 0,
      discount: Number(body.discount) || 0,
      couponCode: body.couponCode || undefined,
      shippingFee: Number(body.shippingFee) || 0,
      tax: Number(body.tax) || 0,
      total: Number(body.total) || 0,
      paymentMethod: body.paymentMethod || 'UPI',
      paymentStatus: body.paymentMethod === 'Cash on Delivery' ? 'COD Confirmed' : 'Paid',
      orderStatus: 'Placed',
      trackingNumber,
      carrier: 'Delhivery Express Surface',
      estimatedDelivery,
      createdAt: now.toISOString(),
      timeline: [
        {
          status: 'Order Placed',
          time: formattedNow,
          description: `Order successfully confirmed via ${body.paymentMethod} (Test Mode).`,
        },
        {
          status: 'Quality Verification',
          time: 'Scheduled next business morning',
          description: 'Silk Mark tagging and silk luster assessment before dispatch.',
        },
      ],
    };

    // Deduct stock
    for (const item of newOrder.items) {
      const prod = await getProductById(item.productId);
      if (prod && prod.stock >= item.quantity) {
        prod.stock -= item.quantity;
        await saveProduct(prod);
      }
    }

    const saved = await saveOrder(newOrder);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
