import { useUserStore } from 'app/store/userStore'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
  const setUsername = useUserStore(state => state.setUsername)
  const router = useRouter()

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
    })

    setUsername(null)

    router.push('/')
  }

  return { logout }
}
