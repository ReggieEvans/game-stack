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
  title: 'Shame Stack | Track Your Gaming Library',
  description:
    'Shame Stack is a tool for tracking your gaming library. It helps you manage your gaming backlog and celebrate completed games.',
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
