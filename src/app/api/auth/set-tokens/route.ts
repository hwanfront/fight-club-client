import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { accessToken, refreshToken } = await request.json()

    if (!accessToken || !refreshToken) {
      return NextResponse.json(
        { message: 'Access token and refresh token are required' },
        { status: 400 }
      )
    }

    const response = NextResponse.json({ message: 'Tokens set successfully' })

    // accessToken 쿠키 설정 (만료 시간: 1시간)
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60, // 1시간
    })

    // refreshToken 쿠키 설정 (만료 시간: 7일)
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7일
    })

    return response
  } catch (error) {
    console.error('Error setting tokens:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
