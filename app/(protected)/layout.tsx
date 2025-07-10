import Footer from '@/components/Footer'
import Header from '@/components/Header'
import UserProvider from '@/components/UserProvider'
import { getUserFromToken } from '@/lib/getUserFromToken'

export default async function MyLibraryLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken()

  return (
    <div className="flex flex-col w-full">
      <UserProvider user={user}>
        <Header />
        <main className="max-w-screen-2xl min-h-[calc(100vh-130px)] w-full mx-auto p-8">{children}</main>
        <Footer />
      </UserProvider>
    </div>
  )
}
