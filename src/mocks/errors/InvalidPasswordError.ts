import { ApiResponseError } from '@/types/ApiResponse'

const INVALID_PASSWORD_ERROR = {
  status: 401,
  code: 'AE001',
  message: '비밀번호가 일치하지 않습니다.',
}

export class InvalidPasswordError extends ApiResponseError {
  constructor() {
    super(INVALID_PASSWORD_ERROR)
    this.name = 'InvalidPasswordError'
  }
}
