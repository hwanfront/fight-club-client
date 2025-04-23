import { useUserStore } from 'app/store/userStore'
import { useEffect } from 'react'

export const useAuthInit = () => {
  const setUsername = useUserStore(state => state.setUsername)

  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await fetch('/api/auth/me')
        if (!res.ok) return

        const user = await res.json()
        setUsername(user.nickname)
      } catch (error) {
        console.log(error)
      }
    }

    restoreUser()
  }, [setUsername])
}
