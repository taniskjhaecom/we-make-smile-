import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Only apply CORS security to API endpoints
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') || '';
    const host = request.headers.get('host') || '';
    
    // Allowed origins (configured via NEXT_PUBLIC_SITE_URL or allowed domain)
    const allowedDomain = process.env.NEXT_PUBLIC_SITE_URL || '';
    
    // In production, verify same-origin or configured domain
    const isAllowed =
      !origin || // Same-origin or non-browser/curl
      origin.includes('localhost') ||
      (allowedDomain && origin.startsWith(allowedDomain)) ||
      origin.includes(host);

    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      const response = new NextResponse(null, { status: 200 });
      if (isAllowed && origin) {
        response.headers.set('Access-Control-Allow-Origin', origin);
      }
      response.headers.set(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
      );
      response.headers.set(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, X-Requested-With'
      );
      response.headers.set('Access-Control-Max-Age', '86400');
      return response;
    }

    const response = NextResponse.next();
    if (isAllowed && origin) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    }
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*',
};
