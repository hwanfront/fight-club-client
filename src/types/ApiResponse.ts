interface ApiResponseParams {
  status: number
  code: string
  message: string
}

export interface ApiResponseBody<T = undefined> extends ApiResponseParams {
  data?: T
}

export class ApiResponseError extends Error {
  code: string
  status: number

  constructor({ status, code, message }: ApiResponseParams) {
    super(message)
    this.name = 'ApiResponseError'
    this.code = code
    this.status = status

    Object.setPrototypeOf(this, ApiResponseError.prototype)
  }
}
