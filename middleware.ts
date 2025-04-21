// middleware.ts
import { jwtVerify } from 'jose';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  // Protect these routes
  const protectedRoutes = ['/nutrition-tracking', '/daily-summary', '/home'];

  if (protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path))) {
    if (!token) {
      console.warn('No token found, redirecting to login');
      return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
      // Verify the JWT token using jose
      console.log('Verifying token:', token);
      await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET!)); // Throws if invalid
      return NextResponse.next();
    } catch (err) {
      console.error('Token verification failed:', err);
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware only to specific paths
export const config = {
  matcher: ['/daily-summary'],
  runtime: 'experimental-edge', // Change to experimental-edge for edge runtime
};

export default middleware;
