'use client'

import { useLogout } from '@/features/auth/hooks/useLogout'
import { useUserStore } from 'app/store/userStore'
import Link from 'next/link'
import { Button } from '../ui/button'

export default function Header() {
  const { username } = useUserStore()
  const { logout } = useLogout()

  return (
    <header>
      <Link href="/">Fight Club</Link>
      {username ? (
        <Button onClick={logout}>로그아웃</Button>
      ) : (
        <Link href="/login">
          <Button>로그인</Button>
        </Link>
      )}
    </header>
  )
}
