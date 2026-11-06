import { NextRequest, NextResponse } from 'next/server';
import { getCoupons, saveCoupon, deleteCoupon } from '@/lib/db';
import { Coupon } from '@/lib/types';

export async function GET() {
  try {
    const coupons = await getCoupons();
    return NextResponse.json(coupons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch coupons' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newCoupon: Coupon = {
      code: body.code.toUpperCase().trim(),
      discountType: body.discountType || 'percentage',
      discountValue: Number(body.discountValue) || 10,
      minOrderValue: Number(body.minOrderValue) || 1999,
      maxDiscount: body.maxDiscount ? Number(body.maxDiscount) : undefined,
      description: body.description || `${body.discountValue}% OFF`,
      active: body.active !== undefined ? Boolean(body.active) : true,
    };

    const saved = await saveCoupon(newCoupon);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create coupon' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    if (!code) {
      return NextResponse.json({ error: 'Coupon code required' }, { status: 400 });
    }
    const success = await deleteCoupon(code);
    return NextResponse.json({ success });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete coupon' }, { status: 500 });
  }
}
