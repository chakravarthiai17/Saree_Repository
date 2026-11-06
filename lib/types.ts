export interface Saree {
  id: string;
  name: string;
  slug: string;
  category: string;
  state: string;
  fabric: string;
  color: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  stock: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isTrending: boolean;
  isBridal: boolean;
  isFeatured: boolean;
  images: string[];
  description: string;
  highlights: string[];
  specifications: {
    sareeLength: string;
    blousePiece: string;
    blouseLength: string;
    blouseIncluded: boolean;
    zariType: string;
    weaveTechnique: string;
    occasion: string[];
    washCare: string;
    certification: string;
  };
  createdAt: string;
}

export interface StateCollection {
  id: string;
  name: string;
  slug: string;
  capital: string;
  region: string;
  description: string;
  heritageStory: string;
  signatureSarees: string[];
  image: string;
  featured: boolean;
}

export interface SareeCategory {
  id: string;
  name: string;
  slug: string;
  stateOrigin: string;
  description: string;
  image: string;
  popularFabric: string;
  productCount?: number;
}

export interface CartItem {
  product: Saree;
  quantity: number;
  selectedColor?: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  userCity: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  date: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  description: string;
  active: boolean;
}

export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  category: string;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: OrderAddress;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shippingFee: number;
  tax: number;
  total: number;
  paymentMethod: 'UPI' | 'Card' | 'NetBanking' | 'Cash on Delivery' | 'Razorpay Test';
  paymentStatus: 'Paid' | 'Pending' | 'COD Confirmed';
  orderStatus: 'Placed' | 'Processing' | 'Dispatched' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: string;
  createdAt: string;
  timeline: {
    status: string;
    time: string;
    description: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  savedAddresses: OrderAddress[];
  createdAt: string;
}
