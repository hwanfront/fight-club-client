import 'server-only'
import { cookies } from 'next/headers'
import { User } from '@/features/auth/types/auth'

export const useUser = async (): Promise<User | null> => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    return null
  }

  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (!accessToken) {
    return null
  }

  try {
    const response = await fetch(
      `${process.env.BACKEND_API_URL}/api/users/me`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.ok) {
      const responseData = await response.json()
      return responseData.data
    }

    return null
  } catch (error) {
    console.error('Failed to fetch user in useUser hook:', error)
    return null
  }
}
