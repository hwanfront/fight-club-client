import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const backendResponse = await fetch(
      `${process.env.BACKEND_API_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    )

    const setCookieHeader = backendResponse.headers.get('Set-Cookie')
    const responseBody = await backendResponse.json()

    const nextResponse = NextResponse.json(responseBody, {
      status: backendResponse.status,
      headers: {
        ...(setCookieHeader && { 'Set-Cookie': setCookieHeader }),
      },
    })

    return nextResponse
  } catch (error) {
    console.error('Error calling backend login API:', error)
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
