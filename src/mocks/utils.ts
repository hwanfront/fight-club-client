import { ApiResponseBody, ApiResponseError } from '@/types/ApiResponse'
import { mockApiResponse } from './mockApiResponse'

function handleResponseError(error: unknown) {
  if (error instanceof ApiResponseError) {
    const { status, code, message } = error
    return mockApiResponse.error({ status, code, message })
  }

  return mockApiResponse.error({
    status: 500,
    code: 'UNEXPECTED_ERROR',
    message: 'Unexpected error occurred.',
  })
}

export function responseHandler<T = undefined>(fn: () => ApiResponseBody<T>) {
  try {
    return mockApiResponse.success(fn())
  } catch (e: unknown) {
    throw handleResponseError(e)
  }
}
