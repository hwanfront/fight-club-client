import { faker } from '@faker-js/faker'
import { MatchingWaitCandidate } from '@/features/matching-wait/types/matchingWait'
import { mockUserStore } from '../store/userStore'

const allUsers = mockUserStore.users

export const createMatchingWaitCandidates = (
  count: number
): MatchingWaitCandidate[] => {
  let availableUsers = [...allUsers]

  const currentUser = mockUserStore.getMe()
  if (currentUser) {
    availableUsers = allUsers.filter(user => user.email !== currentUser.email)
  }

  const shuffled = faker.helpers.shuffle(availableUsers)
  const selectedUsers = shuffled.slice(0, count)

  return selectedUsers.map(user => ({
    userId: user.id,
    nickname: user.nickname,
    profileImageUrl: user.profileImageUrl,
    physiqueImageUrl: faker.helpers.arrayElement([
      faker.image.personPortrait(),
      null,
    ]),
    weight: faker.number.int({ min: 45, max: 120 }),
    weightClass: faker.helpers.arrayElement([
      'LIGHT_FLY',
      'FLY',
      'BANTAM',
      'FEATHER',
      'LIGHT',
      'LIGHT_WELTER',
      'WELTER',
      'LIGHT_MIDDLE',
      'MIDDLE',
      'LIGHT_HEAVY',
      'HEAVY',
      'SUPER_HEAVY',
    ]),
  }))
}
