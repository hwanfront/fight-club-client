import Link from 'next/link'
import { UserNav } from './userNav'
import { useUser } from '@/hooks/useUser'
import StoreInitializer from '../hydrate/storeInitializer'

export default async function Header() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const user = await useUser()

  return (
    <>
      <StoreInitializer user={user} />

      <header className="bg-background sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container-wrapper 3xl:fixed:px-0 h-14 content-center px-6">
          <div className="3xl:fixed:container flex items-center gap-2">
            <Link href="/" className="flex items-center">
              <h1 className="font-bold">Fight Club</h1>
            </Link>
            <div className="flex flex-1 items-center justify-end">
              <UserNav initialUser={user} />
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
