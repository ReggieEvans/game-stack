import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getUserFromToken } from '@/lib/getUserFromToken'
import Image from 'next/image'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserFromToken()

  return (
    <>
      <Header userName={user?.username} />
      <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
        <div className="w-full max-w-md bg-card rounded-2xl shadow-md p-8 text-foreground">
          <div className="flex flex-col justify-center items-center py-4 space-y-6">
            <Image src="/images/logo-text-491-74.png" alt="Next.js Logo" width={624} height={126} priority />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
