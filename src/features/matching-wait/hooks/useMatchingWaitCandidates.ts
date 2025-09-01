'use client'

import { useState, useCallback } from 'react'
import { apiFetch } from '@/lib/api'
import {
  MatchingWaitCandidate,
  MatchingWaitCandidateResponse,
} from '@/features/matching-wait/types/matchingWait'
import { ApiResponseError } from '@/types/ApiResponse'

interface UseMatchingWaitCandidatesReturn {
  candidate: MatchingWaitCandidate | null
  isLoading: boolean
  error: ApiResponseError | null
  fetchCandidate: () => Promise<void>
  refetch: () => Promise<void>
}

const getMatchingWaitCandidates = async (): Promise<
  MatchingWaitCandidate[]
> => {
  const response = await apiFetch('/api/matching-wait/candidate', {
    credentials: 'include',
  })
  const data: MatchingWaitCandidateResponse = await response.json()
  return data.data
}

export const useMatchingWaitCandidates =
  (): UseMatchingWaitCandidatesReturn => {
    const [candidate, setCandidate] = useState<MatchingWaitCandidate | null>(
      null
    )
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiResponseError | null>(null)

    const fetchCandidate = useCallback(async () => {
      setIsLoading(true)
      setError(null)

      try {
        const candidates = await getMatchingWaitCandidates()
        setCandidate(candidates[0] || null)
      } catch (err) {
        const apiError = err as ApiResponseError
        setError(apiError)
        setCandidate(null)
      } finally {
        setIsLoading(false)
      }
    }, [])

    const refetch = useCallback(async () => {
      await fetchCandidate()
    }, [fetchCandidate])

    return {
      candidate,
      isLoading,
      error,
      fetchCandidate,
      refetch,
    }
  }
