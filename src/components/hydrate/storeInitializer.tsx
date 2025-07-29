'use client'

import { useEffect } from 'react'
import { useUserStore } from '@/store/userStore'
import { User } from '@/features/auth/types/auth'

function StoreInitializer({ user }: { user: User | null }) {
  const { login, setLoading } = useUserStore()

  useEffect(() => {
    if (user) {
      login(user)
    }
    setLoading(false)
  }, [user, login, setLoading])

  return null
}

export default StoreInitializer
