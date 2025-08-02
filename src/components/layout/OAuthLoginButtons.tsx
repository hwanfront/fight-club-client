import React from 'react'
import { Button } from '../ui/shadcn/button'
import Link from 'next/link'
import { SvgIcon } from '../icon/SvgIcon'

export function OAuthLoginButtons() {
  return (
    <div className="space-y-2">
      <Button className="w-full" variant="outline" asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/google`}
        >
          <SvgIcon name="google" className="h-full scale-150" />
          <span>Login with Google</span>
        </Link>
      </Button>
      <Button className="w-full" style={{ backgroundColor: '#03C75A' }} asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/naver`}
        >
          <SvgIcon name="naver" className="h-full scale-150" />
          <span>Login with Naver</span>
        </Link>
      </Button>
      <Button
        className="w-full text-black"
        style={{ backgroundColor: '#FEE500' }}
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/kakao`}
        >
          <SvgIcon name="kakao" className="h-full scale-150" />
          <span>Login with Kakao</span>
        </Link>
      </Button>
    </div>
  )
}
