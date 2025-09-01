'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/shadcn/button'
import { useLogout } from '@/features/auth/hooks/useLogout'
import { User } from '@/features/auth/types/auth'
import { useUserStore } from '@/store/userStore'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/shadcn/avatar'
import { SvgIcon } from '../icon/SvgIcon'

type UserNavProps = {
  initialUser: User | null
}

export function UserNav({ initialUser }: UserNavProps) {
  const { isLoggedIn, user, isLoading } = useUserStore()
  const { logout } = useLogout()

  const renderLoggedInUI = (
    username: string,
    profileImageUrl: string | null
  ) => (
    <div className="flex items-center gap-4">
      <Button asChild variant="ghost" size="sm">
        <Link href="/matching-wait">매칭 대기</Link>
      </Button>
      <span className="hidden text-sm font-medium sm:block">
        Welcome, {username}
      </span>
      <Avatar>
        {profileImageUrl && (
          <AvatarImage src={profileImageUrl} alt={username} />
        )}
        <AvatarFallback>
          {profileImageUrl ? (
            username
          ) : (
            <SvgIcon name="lucide-user" className="w-8 h-8 text-gray-400" />
          )}
        </AvatarFallback>
      </Avatar>
      <Button onClick={logout} size="sm">
        로그아웃
      </Button>
    </div>
  )

  const renderLoggedOutUI = () => (
    <Button asChild size="sm">
      <Link href="/login">로그인</Link>
    </Button>
  )

  // Hydration 이전 (스토어가 아직 로딩 중)
  if (isLoading) {
    return initialUser
      ? renderLoggedInUI(initialUser.username, initialUser.profileImageUrl)
      : renderLoggedOutUI()
  }

  // Hydration 이후
  if (isLoggedIn && user) {
    return renderLoggedInUI(user.username, user.profileImageUrl)
  }

  return renderLoggedOutUI()
}
