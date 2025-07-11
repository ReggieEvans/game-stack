import Footer from '@/components/Footer'
import Header from '@/components/Header'
import UserProvider from '@/components/UserProvider'
import { getUserFromToken } from '@/lib/getUserFromToken'

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken()

  return (
    <div>
      <UserProvider user={user}>
        <Header />
        {children}
        <Footer />
      </UserProvider>
    </div>
  )
}
