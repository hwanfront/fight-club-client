import React from 'react'
import { Button } from '../ui/shadcn/button'
import Link from 'next/link'
import { SvgIcon } from '../icon/SvgIcon'

export function OAuthLoginIconButtons() {
  return (
    <div className="flex justify-center gap-3">
      <Button size="icon" className="size-10" variant="outline" asChild>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/google`}
        >
          <SvgIcon name="google" className="size-full" />
        </Link>
      </Button>
      <Button
        size="icon"
        className="size-10"
        style={{ backgroundColor: '#03C75A' }}
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/naver`}
        >
          <SvgIcon name="naver" className="size-full" />
        </Link>
      </Button>
      <Button
        size="icon"
        className="size-10 text-black"
        style={{ backgroundColor: '#FEE500' }}
        asChild
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/kakao`}
        >
          <SvgIcon name="kakao" className="size-full" />
        </Link>
      </Button>
    </div>
  )
}
