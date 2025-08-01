'use client'

import { FormEvent, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Input } from '@/components/ui/shadcn/input'
import { Button } from '@/components/ui/shadcn/button'
import { ApiResponseError } from '@/types/ApiResponse'
import Link from 'next/link'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useLogin()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
    } catch (error) {
      if (error instanceof ApiResponseError) {
        setError(error.message)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" className="w-full">
        로그인
      </Button>
      <Button variant="outline" className="w-full" asChild>
        <Link href="register">회원가입</Link>
      </Button>
    </form>
  )
}
