import { ApiResponseError } from '@/types/ApiResponse'

const isDev = process.env.NODE_ENV === 'development'

const getFetchUrl = (path: RequestInfo) => {
  return typeof path === 'string' ? `${isDev ? '/mock' : ''}${path}` : path
}

export async function apiFetch(path: RequestInfo, init?: RequestInit) {
  const url = getFetchUrl(path)
  const response = await fetch(url, init)

  if (!response.ok) {
    const { status, code, message } = await response.json()

    throw new ApiResponseError({ status, code, message })
  }

  return response
}
