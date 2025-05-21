import { http } from 'msw'
import { mockTestStore } from '../store/testStore'
import { responseHandler } from '../utils'
import { ApiResponseBody } from '@/types/ApiResponse'
import { TestResponse } from '@/types/test'

export const testHandlers = [
  http.get<never, never, ApiResponseBody<TestResponse[]>>(
    '/mock/api/test',
    () => {
      return responseHandler(() => {
        const data = mockTestStore.getUsers()
        return {
          status: 200,
          code: 'TS002',
          message: '회원 정보 조회 성공',
          data,
        }
      })
    }
  ),
]
