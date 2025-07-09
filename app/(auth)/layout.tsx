import CopyText from '@/components/CopyText'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getUserFromToken } from '@/lib/getUserFromToken'
import Image from 'next/image'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getUserFromToken()

  return (
    <>
      <Header userName={user?.username} />
      <main className="flex flex-col min-h-screen items-center bg-background px-4 mt-12">
        <div className="border border-border w-full max-w-md mb-12 rounded">
          <h2 className="font-black text-lg bg-destructive px-4 py-1 text-center rounded-t text-destructive-foreground">
            DEMO LOGIN
          </h2>
          <div className="px-4 py-4">
            <p>Registering is disabled for the demo. Please use the login credentials below to sign into ShameStack.</p>
            <p>- - - - - - -</p>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <span className="font-bold">Email:</span>
                <CopyText text="demo@shamestack.com" />
              </div>
              <div className="flex gap-2">
                <span className="font-bold">Password:</span>
                <CopyText text="DemoUser#1234" />
              </div>
              <p>- - - - - - -</p>
            </div>
          </div>
        </div>
        <div className="w-full max-w-md bg-card rounded-2xl shadow-md p-8 text-foreground">
          <div className="flex flex-col justify-center items-center py-4 space-y-6">
            <Image src="/images/logo-text-507-44.png" alt="ShameStack Logo" width={624} height={126} priority />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
