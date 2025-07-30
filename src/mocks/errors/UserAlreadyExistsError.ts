import { ApiResponseError } from '@/types/ApiResponse'

const USER_ALREADY_EXIST_ERROR = {
  status: 409,
  code: 'UE002',
  message: '이미 가입된 사용자입니다.',
}

export class UserAlreadyExistsError extends ApiResponseError {
  constructor() {
    super(USER_ALREADY_EXIST_ERROR)
    this.name = 'UserAlreadyExistsError'
  }
}
