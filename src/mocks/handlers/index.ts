import { authHandlers } from './auth'
import { matchingWaitHandlers } from './matchingWait'
import { userHandlers } from './user'

export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...matchingWaitHandlers,
]
