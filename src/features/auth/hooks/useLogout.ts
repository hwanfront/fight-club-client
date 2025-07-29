import { apiFetch } from '@/lib/api'
import { useUserStore } from '@/store/userStore'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const logoutUser = useUserStore(state => state.logout)
  const router = useRouter()

  const logout = async () => {
    await apiFetch('/api/auth/logout', {
      method: 'POST',
    })

    logoutUser()

    router.push('/')
  }

  return { logout }
}
