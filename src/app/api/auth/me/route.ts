import { NextRequest, NextResponse } from 'next/server'

export function GET(req: NextRequest) {
  const token = req.cookies.get('accessToken')?.value

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const user = {
    id: 1,
    email: 'test@example.com',
    nickname: '이름',
  }

  return NextResponse.json(user)
}
