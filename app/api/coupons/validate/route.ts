import { NextRequest, NextResponse } from 'next/server';
import { getCoupons } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();
    if (!code || typeof subtotal !== 'number') {
      return NextResponse.json({ error: 'Code and subtotal are required' }, { status: 400 });
    }

    const coupons = await getCoupons();
    const coupon = coupons.find(
      (c) => c.code.toUpperCase() === code.toUpperCase().trim() && c.active
    );

    if (!coupon) {
      return NextResponse.json(
        { valid: false, message: 'Invalid or expired coupon code' },
        { status: 404 }
      );
    }

    if (subtotal < coupon.minOrderValue) {
      return NextResponse.json(
        {
          valid: false,
          message: `Minimum order value for ${coupon.code} is ₹${coupon.minOrderValue}`,
        },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = Math.round((subtotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    return NextResponse.json({
      valid: true,
      coupon,
      discount,
      message: `Coupon ${coupon.code} applied successfully!`,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Validation failed' }, { status: 500 });
  }
}
