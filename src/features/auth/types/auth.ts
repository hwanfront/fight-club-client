export type User = {
  email: string
  username: string
  nickname: string
  profileImageUrl: string | null
}

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
  profileImageUrl: string | null
}

export interface RefreshRequest {
  refreshToken: string
}

export interface RefreshResponse {
  accessToken: string
  refreshToken: string
}

export interface MeResponse {
  email: string
  username: string
  nickname: string
  profileImageUrl: string | null
}
