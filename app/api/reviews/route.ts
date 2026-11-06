import { NextRequest, NextResponse } from 'next/server';
import { getReviews, addReview } from '@/lib/db';
import { Review } from '@/lib/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const reviews = await getReviews(productId || undefined);
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.productId || !body.userName || !body.rating) {
      return NextResponse.json({ error: 'Missing required review fields' }, { status: 400 });
    }

    const newReview: Review = {
      id: `rev-${Date.now()}`,
      productId: body.productId,
      userName: body.userName,
      userCity: body.userCity || 'India',
      rating: Number(body.rating) || 5,
      title: body.title || 'Verified Saree Experience',
      comment: body.comment || '',
      verifiedPurchase: true,
      date: new Date().toISOString().split('T')[0],
    };

    const saved = await addReview(newReview);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post review' }, { status: 500 });
  }
}
