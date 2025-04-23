'use client'

import { Button } from '@/components/ui/button'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { useUserStore } from 'app/store/userStore'

export default function DebugPage() {
  const { username } = useUserStore()
  const { logout } = useLogout()

  return (
    <div className="p-6 space-y-4">
      <div>Username: {username ?? '없음'}</div>
      <Button onClick={logout}>로그아웃</Button>
    </div>
  )
}
