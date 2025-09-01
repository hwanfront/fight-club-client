import { http, HttpResponse, delay } from 'msw'
import { createMatchingWaitCandidates } from '../faker/matchingWait'

export const matchingWaitHandlers = [
  http.get('/api/matching-wait/candidate', async () => {
    await delay(500)

    const mockData = createMatchingWaitCandidates(10)

    return HttpResponse.json({
      status: 200,
      code: 'MWS005',
      message: '체급에 맞는 매칭 대기 정보를 불러왔습니다.',
      data: mockData,
    })
  }),
]
