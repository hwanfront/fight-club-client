'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/config/queryClient'
import { Suspense, type ReactNode } from 'react'
import { useMSW } from '@/hooks/useMSW'

export default function Providers({ children }: { children: ReactNode }) {
  useMSW()

  return (
    <Suspense fallback={null}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  )
}
