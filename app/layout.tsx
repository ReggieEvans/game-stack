import './globals.css'

import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'

import { ThemeProvider } from '@/components/providers/theme-provider'
import { Toaster } from '@/components/ui/toaster'

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
  weight: ['400', '500', '700', '900'],
})

export const metadata: Metadata = {
  title: 'Next.js 15 Starter Template',
  description:
    'Next.js 15 starter with auth, roles, MongoDB, dark mode, and ShadCN UI. Perfect for SaaS apps and dashboards.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
