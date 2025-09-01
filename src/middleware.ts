import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value

  if (!token) {
    const url = new URL('/login', request.url)
    url.searchParams.set('redirect_uri', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/protected/:path*', '/matching-wait/:path*'],
}
