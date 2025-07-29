import { http } from 'msw'
import { mockUserStore } from '../store/userStore'
import { responseHandler } from '../utils'
import {
  LoginRequest,
  RefreshRequest,
  RefreshResponse,
} from '@/features/auth/types/auth'
import { ApiResponseBody } from '@/types/ApiResponse'

export const authHandlers = [
  http.post<never, LoginRequest, ApiResponseBody>(
    '/api/auth/login',
    async ({ request }) => {
      const body = await request.json()
      let newAccessToken
      let newRefreshToken
      const response = responseHandler(() => {
        const { accessToken, refreshToken } = mockUserStore.login(body)

        newAccessToken = accessToken
        newRefreshToken = refreshToken

        return {
          status: 200,
          code: 'AS001',
          message: '로그인 성공',
        }
      })

      response.headers.set(
        'Set-Cookie',
        `accessToken=${newAccessToken}; Path=/; HttpOnly`
      )

      response.headers.append(
        'Set-Cookie',
        `refreshToken=${newRefreshToken}; Path=/; HttpOnly`
      )

      return response
    }
  ),

  http.post('/api/auth/logout', () => {
    return responseHandler(() => {
      mockUserStore.logout()
      return {
        status: 200,
        code: 'AS002',
        message: '로그아웃 성공',
      }
    })
  }),

  http.post<never, RefreshRequest, ApiResponseBody<RefreshResponse>>(
    '/api/auth/refresh',
    async ({ request }) => {
      const body = await request.json()
      return responseHandler(() => {
        const data = mockUserStore.refresh(body)
        return {
          status: 200,
          code: 'AS003',
          message: '토큰 리프레시 성공',
          data,
        }
      })
    }
  ),
]
