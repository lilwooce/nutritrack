import connectMongoDB from '@/config/mongodb';
import User from '@/models/userSchema';
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  try {
    await connectMongoDB();
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!));
    const user = await User.findById(payload.userId).select('-password');
    return NextResponse.json({ user });
  } catch (err) {
    console.error('Error fetching user:', err);
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
