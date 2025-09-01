'use client'

import { SvgIcon } from '@/components/icon/SvgIcon'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/shadcn/avatar'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/shadcn/card'
import { MatchingWaitCandidate } from '../types/matchingWait'

interface MatchingWaitCandidateCardProps {
  candidate: MatchingWaitCandidate
}

export const MatchingWaitCandidateCard = ({
  candidate,
}: MatchingWaitCandidateCardProps) => {
  const { nickname, weight, weightClass, profileImageUrl, physiqueImageUrl } =
    candidate

  return (
    <Card className="relative flex h-full w-full flex-col justify-between overflow-hidden">
      {physiqueImageUrl ? (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${physiqueImageUrl})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
            <CardHeader className="p-0">
              <CardTitle className="text-3xl font-bold">{nickname}</CardTitle>
              <CardDescription className="text-lg text-gray-200">
                {weight}kg, {weightClass}
              </CardDescription>
            </CardHeader>
          </div>
        </>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6">
          <Avatar className="h-32 w-32">
            {profileImageUrl && <AvatarImage src={profileImageUrl} />}
            <AvatarFallback className="text-6xl">
              {profileImageUrl ? (
                nickname[0]
              ) : (
                <SvgIcon
                  name="lucide-user"
                  className="h-16 w-16 text-gray-400"
                />
              )}
            </AvatarFallback>
          </Avatar>
          <CardHeader className="p-0 text-center">
            <CardTitle className="text-3xl font-bold">{nickname}</CardTitle>
            <CardDescription className="text-lg">
              {weight}kg, {weightClass}
            </CardDescription>
          </CardHeader>
        </div>
      )}
    </Card>
  )
}
