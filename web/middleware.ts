import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

async function verifyAccessToken(token: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/verify-access`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isPublicPath = path === '/auth'
  const token = request.cookies.get('access_token')?.value || ''

  // If no token and trying to access protected routes
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth', request.nextUrl))
  }

  // If has token and trying to access auth page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/admin', request.nextUrl))
  }

  // For protected routes, verify token and check admin status
  if (!isPublicPath && token) {
    const verificationResult = await verifyAccessToken(token);
    
    if (!verificationResult) {
      // Token is invalid
      const response = NextResponse.redirect(new URL('/auth', request.nextUrl));
      response.cookies.delete('access_token');
      response.cookies.delete('refresh_token');
      return response;
    }

    const isAdmin = verificationResult.isAdmin;

    // Admin access control
    if (isAdmin) {
      // Admin can't access /admin page, only /admin/dashboard
      if (path === '/admin') {
        return NextResponse.redirect(new URL('/admin/dashboard', request.nextUrl))
      }
    } else {
      // Non-admin can only access /admin, not /admin/dashboard
      if (path === '/admin/dashboard') {
        return NextResponse.redirect(new URL('/admin', request.nextUrl))
      }
    }
  }
}

export const config = {
  matcher: ['/admin', '/admin/dashboard', '/auth']
}
