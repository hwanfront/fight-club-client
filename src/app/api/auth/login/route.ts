import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  const accessToken = 'test.jwt.token'
  const user = {
    id: 1,
    email,
    nickname: '이름',
  }

  const response = NextResponse.json(user, { status: 200 })
  response.cookies.set('accessToken', accessToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    maxAge: 60 * 60,
  })

  return response
}
