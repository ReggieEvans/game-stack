import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function MyLibraryLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="max-w-screen-2xl min-h-[calc(100vh-130px)] w-full mx-auto p-8">{children}</main>
      <Footer />
    </div>
  )
}
