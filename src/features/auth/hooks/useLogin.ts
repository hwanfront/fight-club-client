import { apiFetch } from '@/lib/api'
import { useUserStore } from '@/store/userStore'
import { ApiResponseError } from '@/types/ApiResponse'
import { useRouter } from 'next/navigation'

export const useLogin = (redirectTo: string = '/') => {
  const loginToStore = useUserStore(state => state.login)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      const loginResponse = await apiFetch(`/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      if (!loginResponse.ok) {
        const responseData = await loginResponse.json()
        throw new ApiResponseError(responseData.message || '로그인 실패')
      }

      const meResponse = await apiFetch(`/api/users/me`, {
        credentials: 'include',
      })

      if (meResponse.ok) {
        const result = await meResponse.json()
        loginToStore({
          username: result.data.username,
          nickname: result.data.nickname,
          email: result.data.email,
          profileImageUrl: result.data.profileImageUrl,
        })
      }

      router.push(redirectTo)
    } catch (error) {
      throw error
    }
  }

  return { login }
}
