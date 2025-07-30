import { ApiResponseError } from '@/types/ApiResponse'

export async function apiFetch(path: RequestInfo, init?: RequestInit) {
  const response = await fetch(path, init)

  if (!response.ok) {
    const { status, code, message } = await response.json()

    throw new ApiResponseError({ status, code, message })
  }

  return response
}
