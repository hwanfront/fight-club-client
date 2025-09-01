'use client'

import { useEffect } from 'react'
import { useMatchingWaitCandidates } from '@/features/matching-wait/hooks/useMatchingWaitCandidates'
import { MatchingWaitCandidateCard } from './MatchingWaitCandidateCard'
import { Button } from '@/components/ui/shadcn/button'
import { ApiResponseError } from '@/types/ApiResponse'
import { CircleCheck, CircleMinus } from 'lucide-react'
// import { CircleCheck, CircleMinus, LoaderCircle } from 'lucide-react'

export const MatchingWaitView = () => {
  const { candidate, error, isLoading, fetchCandidate, refetch } =
    useMatchingWaitCandidates()

  useEffect(() => {
    fetchCandidate()
  }, [fetchCandidate])

  console.log(candidate)

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    const apiError = error as ApiResponseError
    // MWE001 is the code for "매칭 대기 정보가 존재하지 않습니다."
    if (apiError.code === 'MWE001') {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <p className="text-center text-muted-foreground">
            현재 체급에 맞는 대기 중인 상대가 없습니다.
            <br />
            매칭 대기를 등록하고 가장 먼저 상대를 만나보세요.
          </p>
        </div>
      )
    }
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-destructive">
          오류가 발생했습니다: {apiError.message}
        </p>
      </div>
    )
  }

  if (!candidate) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-center text-muted-foreground">
          현재 체급에 맞는 대기 중인 상대가 없습니다.
          <br />
          매칭 대기를 등록하고 가장 먼저 상대를 만나보세요.
        </p>
      </div>
    )
  }

  const handleReject = async () => {
    console.log('Rejected candidate:', candidate.userId)
    // TODO: Implement reject logic
    await refetch() // 새로운 후보 가져오기
  }

  const handleRequest = async () => {
    console.log('Requested match with candidate:', candidate.userId)
    // TODO: Implement request logic
    await refetch() // 새로운 후보 가져오기
  }

  return (
    <div className="flex h-full max-h-[calc(100vh-150px)] w-full flex-col items-center md:justify-center md:max-w-4xl md:mx-auto p-6">
      {/* 모바일/PC 공통 타이틀 */}
      <div className="hidden md:block md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          매칭 상대 찾기
        </h1>
        <p className="text-sm md:text-base text-muted-foreground text-center">
          체급에 맞는 상대를 찾아 매칭을 요청해보세요
        </p>
      </div>

      {/* 카드 영역 */}
      <div className="flex-none w-full h-full md:w-[396px] md:h-[702px]">
        <MatchingWaitCandidateCard candidate={candidate} />
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-6 mt-6 justify-center">
        <Button size="lg" variant="destructive" onClick={handleReject}>
          <CircleMinus className="mr-2" /> 거절
        </Button>
        <Button size="lg" onClick={handleRequest}>
          <CircleCheck className="mr-2" /> 요청
        </Button>
        {/* <Button
          className="text-base w-24"
          size="lg"
          disabled
          onClick={handleRequest}
        >
          <LoaderCircle className="animate-spin" /> 대기
        </Button> */}
      </div>
    </div>
  )
}
