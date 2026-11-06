import fs from 'fs/promises';
import path from 'path';
import {
  Saree,
  StateCollection,
  SareeCategory,
  Review,
  Coupon,
  Order,
  UserProfile,
} from './types';

const dataDir = path.join(process.cwd(), 'data');

async function readJsonFile<T>(filename: string, fallback: T): Promise<T> {
  try {
    const filePath = path.join(dataDir, filename);
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T;
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return fallback;
  }
}

async function writeJsonFile<T>(filename: string, data: T): Promise<void> {
  try {
    const filePath = path.join(dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error(`Error writing to ${filename}:`, error);
    throw error;
  }
}

// Products
export async function getProducts(): Promise<Saree[]> {
  return readJsonFile<Saree[]>('products.json', []);
}

export async function getProductById(id: string): Promise<Saree | null> {
  const products = await getProducts();
  return products.find((p) => p.id === id || p.slug === id) || null;
}

export async function saveProduct(product: Saree): Promise<Saree> {
  const products = await getProducts();
  const index = products.findIndex((p) => p.id === product.id);
  if (index >= 0) {
    products[index] = product;
  } else {
    products.unshift(product);
  }
  await writeJsonFile('products.json', products);
  return product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const products = await getProducts();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length !== products.length) {
    await writeJsonFile('products.json', filtered);
    return true;
  }
  return false;
}

// Categories
export async function getCategories(): Promise<SareeCategory[]> {
  return readJsonFile<SareeCategory[]>('categories.json', []);
}

export async function saveCategory(category: SareeCategory): Promise<SareeCategory> {
  const categories = await getCategories();
  const index = categories.findIndex((c) => c.id === category.id);
  if (index >= 0) {
    categories[index] = category;
  } else {
    categories.push(category);
  }
  await writeJsonFile('categories.json', categories);
  return category;
}

// States
export async function getStates(): Promise<StateCollection[]> {
  return readJsonFile<StateCollection[]>('states.json', []);
}

export async function getStateBySlug(slug: string): Promise<StateCollection | null> {
  const states = await getStates();
  return states.find((s) => s.slug === slug || s.id === slug) || null;
}

// Orders
export async function getOrders(): Promise<Order[]> {
  return readJsonFile<Order[]>('orders.json', []);
}

export async function getOrderById(id: string): Promise<Order | null> {
  const orders = await getOrders();
  return orders.find((o) => o.id === id || o.orderNumber === id) || null;
}

export async function saveOrder(order: Order): Promise<Order> {
  const orders = await getOrders();
  const index = orders.findIndex((o) => o.id === order.id);
  if (index >= 0) {
    orders[index] = order;
  } else {
    orders.unshift(order);
  }
  await writeJsonFile('orders.json', orders);
  return order;
}

export async function updateOrderStatus(
  orderId: string,
  newStatus: Order['orderStatus'],
  timelineNote?: string
): Promise<Order | null> {
  const orders = await getOrders();
  const order = orders.find((o) => o.id === orderId);
  if (!order) return null;

  order.orderStatus = newStatus;
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  order.timeline.push({
    status: newStatus,
    time: dateFormatted,
    description: timelineNote || `Order status updated to ${newStatus}.`,
  });

  await writeJsonFile('orders.json', orders);
  return order;
}

// Coupons
export async function getCoupons(): Promise<Coupon[]> {
  return readJsonFile<Coupon[]>('coupons.json', []);
}

export async function saveCoupon(coupon: Coupon): Promise<Coupon> {
  const coupons = await getCoupons();
  const index = coupons.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
  if (index >= 0) {
    coupons[index] = coupon;
  } else {
    coupons.push(coupon);
  }
  await writeJsonFile('coupons.json', coupons);
  return coupon;
}

export async function deleteCoupon(code: string): Promise<boolean> {
  const coupons = await getCoupons();
  const filtered = coupons.filter((c) => c.code.toUpperCase() !== code.toUpperCase());
  if (filtered.length !== coupons.length) {
    await writeJsonFile('coupons.json', filtered);
    return true;
  }
  return false;
}

// Reviews
export async function getReviews(productId?: string): Promise<Review[]> {
  const reviews = await readJsonFile<Review[]>('reviews.json', []);
  if (productId) {
    return reviews.filter((r) => r.productId === productId);
  }
  return reviews;
}

export async function addReview(review: Review): Promise<Review> {
  const reviews = await getReviews();
  reviews.unshift(review);
  await writeJsonFile('reviews.json', reviews);

  // Update product rating and review count
  const products = await getProducts();
  const product = products.find((p) => p.id === review.productId);
  if (product) {
    const prodReviews = reviews.filter((r) => r.productId === product.id);
    const avg =
      prodReviews.reduce((sum, r) => sum + r.rating, 0) / (prodReviews.length || 1);
    product.rating = Number(avg.toFixed(1));
    product.reviewCount = prodReviews.length;
    await writeJsonFile('products.json', products);
  }

  return review;
}

// Users
export async function getUsers(): Promise<UserProfile[]> {
  return readJsonFile<UserProfile[]>('users.json', []);
}

export async function findUserByEmail(email: string): Promise<UserProfile | null> {
  const users = await getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function saveUser(user: UserProfile): Promise<UserProfile> {
  const users = await getUsers();
  const index = users.findIndex((u) => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  await writeJsonFile('users.json', users);
  return user;
}
