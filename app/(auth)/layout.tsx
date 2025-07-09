import Image from 'next/image'

const Layout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-md bg-card rounded-2xl shadow-md p-8 text-foreground">
        <div className="flex flex-col justify-center items-center py-4 space-y-6">
          <Image src="/images/logo-text-491-74.png" alt="Next.js Logo" width={624} height={126} priority />
        </div>
        {children}
      </div>
    </main>
  )
}

export default Layout
