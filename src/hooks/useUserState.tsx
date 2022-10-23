import React, { useState, createContext, useContext, useMemo } from 'react'
import useLocalStorage from './useLocalStorage'
import { UserState } from '../types/user'

const userStateContext = createContext<any>(null)

export const useUserState = () => useContext(userStateContext)

export function UserStateProvider({ children }: { children: React.ReactNode }) {
  const [userState, setUserState] = useLocalStorage<UserState>('userState', {
    selectedChannel: null,
    selectedServer: null
  })

  const value = useMemo(() => ({ userState, setUserState }), [userState])
  return <userStateContext.Provider value={value}>{children}</userStateContext.Provider>
}
