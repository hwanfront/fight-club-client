import { HttpResponse } from 'msw'
import { ApiResponseBody } from '@/types/ApiResponse'

export const mockApiResponse = {
  success<T>({ status = 200, code, message, data }: ApiResponseBody<T>) {
    return HttpResponse.json<ApiResponseBody<T>>(
      { status, code, message, data },
      { status }
    )
  },

  error({ status = 400, code, message }: ApiResponseBody) {
    return HttpResponse.json<ApiResponseBody>(
      { status, code, message },
      { status }
    )
  },
}
