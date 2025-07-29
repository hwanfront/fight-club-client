import {
  LoginRequest,
  LoginResponse,
  RefreshRequest,
  RefreshResponse,
  MeResponse,
  SignupRequest,
} from '@/features/auth/types/auth'
import { createMockUser, createUser } from '../faker/user'
import { InvalidPasswordError } from '../errors/InvalidPasswordError'
import { UserNotFoundError } from '../errors/UserNotFoundError'
import { UnauthorizedError } from '../errors/UnauthorizedError'
import { UserAlreadyExistsError } from '../errors/UserAlreadyExistsError'
import { RefreshTokenNotFoundError } from '../errors/RefreshTokenNotFoundError'

let currentUser: ReturnType<typeof createMockUser> | null = null
const users: ReturnType<typeof createMockUser>[] = []

const initialize = () => {
  for (let i = 0; i < 3; i++) {
    users.push(createMockUser())
  }
}

users.push(
  createUser({
    email: 'test@gmail.com',
    password: '1234',
    nickname: 'test',
    username: 'test',
  })
)
initialize()

export const mockUserStore = {
  users,
  login({ email, password }: LoginRequest): LoginResponse {
    const userIdx = users.findIndex(user => email === user.email)

    if (userIdx === -1) {
      throw new UserNotFoundError()
    }

    const user = users[userIdx]

    if (user.password !== password) {
      throw new InvalidPasswordError()
    }

    currentUser = users[userIdx]

    return {
      accessToken: 'mock.access.token',
      refreshToken: 'mock.refresh.token',
    }
  },
  signup({ email, password, nickname, username }: SignupRequest): void {
    const userIdx = users.findIndex(user => email === user.email)

    if (userIdx !== -1) {
      throw new UserAlreadyExistsError()
    }

    const user = createUser({ email, password, nickname, username })
    users.push(user)
  },
  refresh({ refreshToken }: RefreshRequest): RefreshResponse {
    if (currentUser === null) {
      throw new UnauthorizedError()
    }

    if (refreshToken === null) {
      throw new RefreshTokenNotFoundError()
    }

    return {
      accessToken: 'mock.access.token',
      refreshToken: 'mock.refresh.token',
    }
  },
  getMe(): MeResponse {
    if (currentUser === null) {
      throw new UnauthorizedError()
    }

    const { email, username, nickname, providerId, provider, role } =
      currentUser

    return { email, username, nickname, providerId, provider, role }
  },
  logout() {
    currentUser = null
  },
}
