import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { getUserFromToken } from '@/lib/getUserFromToken'

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const user = await getUserFromToken()

  return (
    <div>
      <Header userName={user?.username} />
      {children}
      <Footer />
    </div>
  )
}
