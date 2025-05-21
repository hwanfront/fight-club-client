import { SignupRequest } from '@/types/test'
import { faker } from '@faker-js/faker'

export const createMockUser = () => ({
  id: faker.string.uuid(),
  email: faker.internet.email(),
  password: '1234',
  username: faker.internet.username(),
  providerId: null,
  provider: null,
  nickname: faker.person.firstName(),
  role: 'ROLE_USER',
})

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
