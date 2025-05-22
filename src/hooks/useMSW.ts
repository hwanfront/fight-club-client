import { handlers } from '@/mocks/handlers'
import { use } from 'react'

const mockingEnabledPromise =
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

export const useMSW = () => {
  if (process.env.NODE_ENV === 'development') {
    use(mockingEnabledPromise)
  }
}
