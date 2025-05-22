export interface TestResponse {
  email: string
  username: string
  nickname: string
  providerId: string | null
  provider: string | null
  role: string
}

export interface SignupRequest {
  email: string
  password: string
  nickname: string
  username: string
}
