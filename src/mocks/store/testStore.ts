import { TestResponse } from '@/types/test'
import { createMockUser, createUser } from '../faker/user'

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

export const mockTestStore = {
  users,
  getUsers(): TestResponse[] {
    return users.map(
      ({ email, nickname, username, providerId, provider, role }) => ({
        email,
        nickname,
        username,
        providerId,
        provider,
        role,
      })
    )
  },
}
