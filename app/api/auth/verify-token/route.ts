import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ message: 'No token found' }, { status: 401 });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error('JWT_SECRET is not defined');

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(secret)
    );

    return NextResponse.json({ message: 'Token is valid', decoded: payload });
  } catch (err: any) {
    console.error('Token verification error:', err.message);
    return NextResponse.json({ message: 'Invalid token', error: err.message }, { status: 401 });
  }
}
