'use client'

import { apiFetch } from '@/lib/api'
import { useEffect } from 'react'

export const useTestUsers = () => {
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiFetch('/api/test', {
          credentials: 'include',
        })

        if (!response.ok) return

        await response.json()
      } catch (error) {
        console.error(error)
      }
    }

    fetchUsers()
  }, [])
}
