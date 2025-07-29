import { handlers } from '@/mocks/handlers'
import { use } from 'react'

let mockingEnabledPromise: Promise<void> | null = null

const initMSW = () => {
  if (mockingEnabledPromise) return mockingEnabledPromise

  mockingEnabledPromise =
    typeof window !== 'undefined'
      ? import('@/mocks/browser').then(async ({ worker }) => {
          await worker.start({
            onUnhandledRequest(request, print) {
              if (request.url.includes('_next')) {
                return
              }
              print.warning()
            },
          })
          worker.use(...handlers)
        })
      : Promise.resolve()

  return mockingEnabledPromise
}

export const useMSW = () => {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'true') {
    use(initMSW())
  }
}
