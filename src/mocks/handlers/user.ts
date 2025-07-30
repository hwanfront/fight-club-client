import { http } from 'msw'
import { mockUserStore } from '../store/userStore'
import { responseHandler } from '../utils'
import { MeResponse } from '@/features/auth/types/auth'
import { ApiResponseBody } from '@/types/ApiResponse'

export const userHandlers = [
  http.get<never, never, ApiResponseBody<MeResponse>>('/api/users/me', () => {
    return responseHandler(() => {
      const data = mockUserStore.getMe()
      return {
        status: 200,
        code: 'US002',
        message: '회원 정보 조회 성공',
        data,
      }
    })
  }),
]
