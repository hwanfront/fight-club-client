import { WeightClassStrings } from './weightClass'

export interface MatchingWaitCandidate {
  userId: string
  nickname: string
  weight: number
  weightClass: WeightClassStrings
  profileImageUrl: string | null
  physiqueImageUrl: string | null
}

export interface MatchingWaitCandidateResponse {
  status: string
  code: string
  message: string
  data: MatchingWaitCandidate[]
}
