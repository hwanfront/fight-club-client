import { ApiResponseError } from '@/types/ApiResponse'

const USER_NOT_FOUND_ERROR = {
  status: 404,
  code: 'UE001',
  message: '유저가 존재하지 않습니다.',
}

export class UserNotFoundError extends ApiResponseError {
  constructor() {
    super(USER_NOT_FOUND_ERROR)
    this.name = 'UserNotFoundError'
  }
}
