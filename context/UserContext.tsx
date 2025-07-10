// context/UserContext.tsx
'use client'

import { createContext, useContext } from 'react'
import { JWTPayload } from '@/types/auth'

export const UserContext = createContext<JWTPayload | null>(null)
export const useUser = () => useContext(UserContext)
