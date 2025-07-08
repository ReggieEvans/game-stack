"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ThemeToggle from "@/components/ui/theme-toggle";

type HeaderProps = {
  userName?: string;
  role?: string;
};

export default function Header({ userName, role }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/home", label: "Home" },
    ...(role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
  ];

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
          <SheetContent side="left" className="space-y-6 p-6">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>

            <div className="space-y-2">
              {links.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`block text-sm font-medium ${
                    pathname === href ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            <form method="POST" action="/api/auth/logout">
              <Button variant="destructive" className="w-full" type="submit">
                Logout
              </Button>
            </form>
          </SheetContent>
        </Sheet>

        {/* Brand */}
        <Link
          href="/home"
          className="text-lg font-heading font-semibold uppercase"
        >
          NEXTJS Starter Template
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center space-x-6">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`text-sm font-medium hover:underline ${
              pathname === href ? "text-primary" : "text-muted-foreground"
            }`}
          >
            {label}
          </Link>
        ))}
        <ThemeToggle />
        <span className="text-sm text-muted-foreground">{userName}</span>
        <form method="POST" action="/api/auth/logout">
          <Button
            variant="ghost"
            className="text-red-600 hover:underline p-0 h-auto"
            type="submit"
          >
            Logout
          </Button>
        </form>
      </div>
    </header>
  );
}
