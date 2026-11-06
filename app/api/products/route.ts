import { NextRequest, NextResponse } from 'next/server';
import { getProducts, saveProduct } from '@/lib/db';
import { Saree } from '@/lib/types';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const state = searchParams.get('state');
    const search = searchParams.get('search');
    const fabric = searchParams.get('fabric');
    const color = searchParams.get('color');
    const occasion = searchParams.get('occasion');
    const sort = searchParams.get('sort');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    const bestSeller = searchParams.get('bestSeller');
    const newArrival = searchParams.get('newArrival');
    const trending = searchParams.get('trending');
    const bridal = searchParams.get('bridal');

    let products = await getProducts();

    if (category) {
      products = products.filter(
        (p) =>
          p.category.toLowerCase().includes(category.toLowerCase()) ||
          p.slug.toLowerCase().includes(category.toLowerCase())
      );
    }

    if (state) {
      products = products.filter(
        (p) =>
          p.state.toLowerCase().includes(state.toLowerCase()) ||
          slugify(p.state).includes(slugify(state))
      );
    }

    if (fabric) {
      products = products.filter((p) =>
        p.fabric.toLowerCase().includes(fabric.toLowerCase())
      );
    }

    if (color) {
      products = products.filter((p) =>
        p.color.toLowerCase().includes(color.toLowerCase())
      );
    }

    if (occasion) {
      products = products.filter((p) =>
        p.specifications.occasion.some((occ) =>
          occ.toLowerCase().includes(occasion.toLowerCase())
        )
      );
    }

    if (minPrice) {
      products = products.filter((p) => p.discountedPrice >= Number(minPrice));
    }

    if (maxPrice) {
      products = products.filter((p) => p.discountedPrice <= Number(maxPrice));
    }

    if (featured === 'true') {
      products = products.filter((p) => p.isFeatured);
    }
    if (bestSeller === 'true') {
      products = products.filter((p) => p.isBestSeller);
    }
    if (newArrival === 'true') {
      products = products.filter((p) => p.isNewArrival);
    }
    if (trending === 'true') {
      products = products.filter((p) => p.isTrending);
    }
    if (bridal === 'true') {
      products = products.filter((p) => p.isBridal);
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sort === 'price-asc') {
      products.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sort === 'rating') {
      products.sort((a, b) => b.rating - a.rating);
    } else if (sort === 'newest') {
      products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sort === 'bestseller') {
      products.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
    }

    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const id = body.id || `saree-${Date.now()}`;
    const slug = body.slug || slugify(body.name);

    const discountPercentage =
      body.discountPercentage ||
      (body.originalPrice && body.discountedPrice
        ? Math.round(((body.originalPrice - body.discountedPrice) / body.originalPrice) * 100)
        : 0);

    const newProduct: Saree = {
      id,
      name: body.name,
      slug,
      category: body.category || 'Traditional Sarees',
      state: body.state || 'Pan-India',
      fabric: body.fabric || 'Pure Silk',
      color: body.color || 'Multicolour',
      originalPrice: Number(body.originalPrice) || 9999,
      discountedPrice: Number(body.discountedPrice) || 7999,
      discountPercentage,
      rating: body.rating || 4.8,
      reviewCount: body.reviewCount || 1,
      stock: Number(body.stock) || 10,
      isNewArrival: Boolean(body.isNewArrival),
      isBestSeller: Boolean(body.isBestSeller),
      isTrending: Boolean(body.isTrending),
      isBridal: Boolean(body.isBridal),
      isFeatured: Boolean(body.isFeatured),
      images: Array.isArray(body.images) && body.images.length > 0
        ? body.images
        : ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80'],
      description: body.description || 'Artisanal handwoven luxury Indian saree.',
      highlights: Array.isArray(body.highlights) && body.highlights.length > 0
        ? body.highlights
        : ['Certified Silk Mark', 'Handcrafted by Master Artisans', 'Pure Handloom Quality'],
      specifications: {
        sareeLength: body.specifications?.sareeLength || '5.5 Metres',
        blousePiece: body.specifications?.blousePiece || 'Matching Silk Blouse Piece',
        blouseLength: body.specifications?.blouseLength || '0.8 Metre',
        blouseIncluded: body.specifications?.blouseIncluded ?? true,
        zariType: body.specifications?.zariType || 'Tested Pure Gold Zari',
        weaveTechnique: body.specifications?.weaveTechnique || 'Traditional Handloom',
        occasion: Array.isArray(body.specifications?.occasion)
          ? body.specifications.occasion
          : ['Festive', 'Wedding', 'Traditional'],
        washCare: body.specifications?.washCare || 'Dry Clean Only',
        certification: body.specifications?.certification || 'Silk Mark India Certified',
      },
      createdAt: new Date().toISOString(),
    };

    const saved = await saveProduct(newProduct);
    return NextResponse.json(saved, { status: 201 });
  } catch (error) {
    console.error('Error adding product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
