import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { LoginForm } from '@/features/auth/components/loginForm'
import Link from 'next/link'
import React from 'react'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle>Fight Club</CardTitle>
          <CardDescription>로그인하여 파이트 클럽에 참여하세요</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm />

          <Separator className="my-4" />
          <Button className="w-full" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/google`}
            >
              Google로 로그인
            </Link>
          </Button>
          <Button className="w-full" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/naver`}
            >
              Naver로 로그인
            </Link>
          </Button>
          <Button className="w-full" asChild>
            <Link
              href={`${process.env.NEXT_PUBLIC_BACKEND_API_URL}/oauth2/authorization/kakao`}
            >
              Kakao로 로그인
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
