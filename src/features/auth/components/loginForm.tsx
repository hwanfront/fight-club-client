'use client'

import { FormEvent, useState } from 'react'
import { useLogin } from '../hooks/useLogin'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserStore } from 'app/store/userStore'

export const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useLogin('/')

  const { username } = useUserStore()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const res = await login(email, password)
      console.log(res)
    } catch (error) {
      console.log(error)
      setError('로그인 실패')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-[300px]">
      <Input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button type="submit" className="w-full">
        로그인
      </Button>
      <p className="text-black-500 text-m">{username ?? 'null'}</p>
    </form>
  )
}
