import { ApiResponseError } from '@/types/ApiResponse'

const REFRESH_TOKEN_NOT_FOUND_ERROR = {
  status: 404,
  code: 'CE002',
  message: '인증이 필요합니다.',
}

export class RefreshTokenNotFoundError extends ApiResponseError {
  constructor() {
    super(REFRESH_TOKEN_NOT_FOUND_ERROR)
    this.name = 'UnauthorizedError'
  }
}
