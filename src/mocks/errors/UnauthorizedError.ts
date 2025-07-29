import { ApiResponseError } from '@/types/ApiResponse'

const UNAUTHORIZED_ERROR = {
  status: 404,
  code: 'CE002',
  message: '인증이 필요합니다.',
}

export class UnauthorizedError extends ApiResponseError {
  constructor() {
    super(UNAUTHORIZED_ERROR)
    this.name = 'UnauthorizedError'
  }
}
