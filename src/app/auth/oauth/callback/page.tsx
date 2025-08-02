'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// 이 컴포넌트는 OAuth 로그인 후 최종 처리를 담당하는 오케스트레이터입니다.
// 1. URL 쿼리 스트링에서 토큰 추출
// 2. /api/auth/set-tokens API를 호출하여 토큰을 HttpOnly 쿠키로 설정
// 3. /api/users/me API를 호출하여 사용자 상태 확인
// 4. 사용자 상태에 따라 / 또는 /register로 리다이렉트

type UserStatus = 'WAITING' | 'REGISTERED'

export default function OAuthCallbackPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [message, setMessage] = useState('로그인 정보를 처리 중입니다...')
  const [error, setError] = useState('')

  useEffect(() => {
    const processOAuthCallback = async () => {
      const accessToken = searchParams.get('accessToken')
      const refreshToken = searchParams.get('refreshToken')
      const error = searchParams.get('error')

      if (error) {
        setError(
          {
            email_already_exists: '이미 존재하는 이메일입니다.',
            user_not_found: '사용자를 찾을 수 없습니다.',
            invalid_user: 'INVALID_USER',
          }[error] ?? 'INVALID_ERROR'
        )
        setTimeout(() => router.replace('/login'), 1000)
        return
      }

      if (!accessToken || !refreshToken) {
        setError('인증 정보가 올바르지 않습니다. 다시 시도해주세요.')
        setTimeout(() => router.replace('/login'), 1000)
        return
      }

      try {
        // 1. 토큰을 서버로 보내 HttpOnly 쿠키로 설정
        setMessage('인증 정보를 안전하게 저장하는 중입니다...')
        const setTokensResponse = await fetch('/api/auth/set-tokens', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ accessToken, refreshToken }),
        })

        if (!setTokensResponse.ok) {
          throw new Error('Failed to set authentication tokens')
        }

        // 2. 쿠키 설정 후, 사용자 상태 확인
        setMessage('사용자 정보를 확인하는 중입니다...')
        const userResponse = await fetch('/api/users/me')

        if (!userResponse.ok) {
          throw new Error('Failed to fetch user status')
        }

        // 3. 사용자 상태에 따라 리다이렉트
        const user = await userResponse.json()
        const href =
          {
            WAITING: '/register',
            REGISTERED: '/',
          }[user.data.status as UserStatus] ?? null

        if (!href) {
          throw new Error(`Unknown user status: ${user.data.status}`)
        }

        router.replace(href)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err)
        console.error('OAuth callback processing failed:', errorMessage)
        setError(
          '로그인 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.'
        )
        setTimeout(() => router.replace('/login'), 1000)
      }
    }

    processOAuthCallback()
  }, [router, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <p className={error && 'text-red-500'}>{error || message}</p>
        {error && <p>잠시 후 로그인 페이지로 이동합니다.</p>}
      </div>
    </div>
  )
}
