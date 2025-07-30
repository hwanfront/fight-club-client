export type User = { username: string; email: string }

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface SignupRequest {
  email: string
  password: string
  nickname: string
  username: string
}

export interface MeResponse {
  email: string
  username: string
  nickname: string
  providerId: string | null
  provider: string | null
  role: string
}

export interface RefreshRequest {
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}
