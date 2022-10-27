import React, { useContext, createContext, useMemo, useState } from 'react'
import useLocalStorage from './useLocalStorage'
import { User } from '../types/user'

const AuthContext = createContext<any>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (e) {
    console.log(e)
    return {}
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User>('user', { id: null, loggedIn: false, token: null, username: null })
  const [error, setError] = useState<string | null>(null)
  const login = (token: string) => {
    const { id, username } = parseJwt(token) as User
    setUser({ id, loggedIn: true, token, username })
  }

  const logout = () => {
    setUser({ ...user, loggedIn: false, token: null })
  }

  const value = useMemo(
    () => ({
      authed: user?.loggedIn || false,
      user,
      login,
      logout
    }),
    [user]
  )
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
