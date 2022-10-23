import React, { useContext, createContext, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import { User } from '../types/user'

const AuthContext = createContext<any>(null)

export const useAuth = () => {
  return useContext(AuthContext)
}

const parseJwt = (token: string) => {
  try {
    const buff = Buffer.from(token.split('.')[1], 'base64')
    return JSON.parse(buff.toString('utf-8'))
  } catch (e) {
    return { error: e }
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage<User>('user', { id: null, loggedIn: false, token: null, username: null })
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
