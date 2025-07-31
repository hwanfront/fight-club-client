import { apiFetch } from '@/lib/api'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const logoutUser = useUserStore(state => state.logout)
  const router = useRouter()

  const logout = async () => {
    try {
      await apiFetch('/api/auth/logout', {
        method: 'POST',
      })
    } catch (error) {
      console.error('Login Error:', error)
    } finally {
      logoutUser()
      router.push('/')
    }
  }

  return { logout }
}
