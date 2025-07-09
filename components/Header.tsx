'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import ThemeToggle from '@/components/ui/theme-toggle'

type HeaderProps = {
  userName?: string
  role?: string
}

export default function Header({ userName, role }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const isAuthenticated = !!userName

  const links = [
    { href: '/my-library', label: 'My Library' },
    ...(role === 'admin' ? [{ href: '/admin', label: 'Admin' }] : []),
  ]

  return (
    <header className="flex items-center justify-between w-full px-6 py-4 border-b bg-background shadow-sm">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Button */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="sm:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="space-y-12 p-6">
            <SheetHeader>
              <SheetTitle>
                <Image src="/images/logo-text-507-81.png" alt="Logo" width={300} height={26} priority />
              </SheetTitle>
            </SheetHeader>

            <div className="space-y-4">
              <Link href="/">Home</Link>
              {isAuthenticated ? (
                links.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={`block ${pathname === href ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {label}
                  </Link>
                ))
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="block text-sm font-medium text-muted-foreground"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>

            {isAuthenticated && (
              <form method="POST" action="/api/auth/logout">
                <Button variant="destructive" className="w-full" type="submit">
                  Logout
                </Button>
              </form>
            )}
          </SheetContent>
        </Sheet>

        {/* Brand */}
        <Link href="/" className="text-lg font-heading font-semibold uppercase">
          <Image src="/images/logo-text-507-81.png" alt="Logo" width={300} height={26} priority />
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-6">
        {isAuthenticated ? (
          <>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-sm font-medium hover:underline ${
                  pathname === href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                <button className="btn-primary-round">{label}</button>
              </Link>
            ))}
            <ThemeToggle />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 text-sm text-muted-foreground">
                  {userName}
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="hover:text-destructive">
                <form method="POST" action="/api/auth/logout">
                  <DropdownMenuItem asChild>
                    <button type="submit" className="w-full text-left cursor-pointer">
                      Logout
                    </button>
                  </DropdownMenuItem>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <ThemeToggle />
            <Link href="/login" className="text-sm font-medium text-muted-foreground hover:underline">
              <button className="btn-primary-round">Login</button>
            </Link>
            {/* <Link href="/signup" className="text-sm font-medium text-muted-foreground hover:underline">
              Register
            </Link> */}
          </>
        )}
      </div>
    </header>
  )
}
