import { OAuthLoginIconButtons } from '@/components/layout/OAuthLoginIconButtons'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import { DividerWithText } from '@/components/ui/dividerWithText'
import { LoginForm } from '@/features/auth/components/loginForm'
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
          <DividerWithText text="간편 로그인" />
          {/* <OAuthLoginButtons /> */}
          <OAuthLoginIconButtons />
        </CardContent>
      </Card>
    </div>
  )
}
