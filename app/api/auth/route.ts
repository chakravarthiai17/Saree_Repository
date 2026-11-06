import { NextRequest, NextResponse } from 'next/server';
import { findUserByEmail, saveUser, getUsers } from '@/lib/db';
import { UserProfile } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, email, name, phone, password, role } = body;

    if (action === 'register') {
      if (!email || !name) {
        return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
      }

      const existing = await findUserByEmail(email);
      if (existing) {
        return NextResponse.json({ error: 'Account with this email already exists' }, { status: 400 });
      }

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name,
        email: email.toLowerCase(),
        phone: phone || '',
        role: role === 'admin' ? 'admin' : 'customer',
        savedAddresses: [],
        createdAt: new Date().toISOString(),
      };

      const saved = await saveUser(newUser);
      return NextResponse.json({ user: saved, message: 'Account created successfully' });
    }

    if (action === 'login') {
      if (!email) {
        return NextResponse.json({ error: 'Email is required' }, { status: 400 });
      }

      let user = await findUserByEmail(email);

      // Auto-provision demo admin or customer if email matches
      if (!user) {
        if (email.toLowerCase().includes('admin')) {
          user = {
            id: 'usr-admin-1',
            name: 'SareeHub Admin',
            email: email.toLowerCase(),
            phone: '+91 74061 97088',
            role: 'admin',
            savedAddresses: [],
            createdAt: new Date().toISOString(),
          };
          await saveUser(user);
        } else {
          user = {
            id: `usr-${Date.now()}`,
            name: name || email.split('@')[0],
            email: email.toLowerCase(),
            phone: phone || '+91 91234 56789',
            role: 'customer',
            savedAddresses: [],
            createdAt: new Date().toISOString(),
          };
          await saveUser(user);
        }
      }

      return NextResponse.json({ user, message: 'Logged in successfully' });
    }

    return NextResponse.json({ error: 'Invalid auth action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
