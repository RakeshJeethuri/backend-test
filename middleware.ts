import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the origin from the request
  const origin = request.headers.get('origin') || '*';
  
  // Allow all origins
  const headers = new Headers();
  headers.set('Access-Control-Allow-Credentials', 'true');
  headers.set('Access-Control-Allow-Origin', origin);
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, { 
      status: 204, 
      headers 
    });
  }

  // For non-OPTIONS requests, continue with the response
  const response = NextResponse.next();
  
  // Apply CORS headers to all responses
  headers.forEach((value, key) => {
    response.headers.set(key, value);
  });

  return response;
}

// Apply this middleware to all API routes
export const config = {
  matcher: '/api/:path*',
};