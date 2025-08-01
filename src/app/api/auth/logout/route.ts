import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value
  const refreshToken = request.cookies.get('refreshToken')?.value

  let body = { message: 'Successfully logged out' }
  let responseInit = { status: 200 }

  try {
    if (refreshToken) {
      const backendResponse = await fetch(
        `${process.env.BACKEND_API_URL}/api/auth/logout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        }
      )

      body = await backendResponse.json()
      responseInit = { status: backendResponse.status }
    }
  } catch (error) {
    body = { message: 'Logout failed' }
    responseInit = { status: 500 }

    console.error('Error during logout:', error)
  } finally {
    const response = NextResponse.json(body, responseInit)
    response.cookies.delete('accessToken')
    response.cookies.delete('refreshToken')
    return response
  }
}
