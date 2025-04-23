'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/config/queryClient'
import { type ReactNode } from 'react'
import { useAuthInit } from '@/features/auth/hooks/useAuthInit'

export default function Providers({ children }: { children: ReactNode }) {
  useAuthInit()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
