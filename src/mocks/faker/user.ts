import { SignupRequest } from '@/features/auth/types/auth'
import { faker } from '@faker-js/faker'

export const createUser = ({
  email,
  password,
  nickname,
  username,
}: SignupRequest) => ({
  id: faker.string.uuid(),
  email,
  password,
  username,
  providerId: null,
  provider: null,
  nickname,
  role: 'ROLE_USER',
})

export const createMockUser = () =>
  createUser({
    email: faker.internet.email(),
    password: '1234',
    username: faker.internet.username(),
    nickname: faker.person.firstName(),
  })
