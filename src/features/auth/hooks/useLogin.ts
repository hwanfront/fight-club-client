import { useUserStore } from 'app/store/userStore'
import { useRouter } from 'next/navigation'

export const useLogin = (redirectTo: string = '/') => {
  const setUsername = useUserStore(state => state.setUsername)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })

    if (!res.ok) {
      throw new Error('로그인 실패')
    }

    const user = await res.json()
    setUsername(user.nickname)

    router.push(redirectTo)
  }

  return { login }
}
