'use client'

import { UserContext } from '@/context/UserContext'
import { JWTPayload } from '@/types/auth'

export default function UserProvider({ user, children }: { user: JWTPayload | null; children: React.ReactNode }) {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
