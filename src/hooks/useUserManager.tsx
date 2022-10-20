import React, { useContext, createContext } from 'react'
import { DataConnection } from 'peerjs'
import useElectronStore from './useElectronStore'
import { Server } from './usePeerManager'

interface UserSettings {
  textColor: string
  avatar: string
}

export interface User {
  peerId?: string
  connection?: DataConnection
  name?: string
  loggedIn?: boolean
  password?: string
  settings?: UserSettings
  servers?: Server[]
}
interface UserManager {
  userData: User | null
  setUserData: (userData: User) => void
}

const userDataContext = createContext<UserManager>({ userData: null, setUserData: () => {} })
export const useUserData = () => useContext(userDataContext)

type Props = {
  children: React.ReactNode
}

export function UserDataProvider({ children }: Props) {
  const [userData, updateUserData] = useElectronStore('userData', null)

  const setUserData = (data: any) => {
    updateUserData({ ...userData, ...data })
  }

  const value = React.useMemo(
    () => ({
      userData,
      setUserData
    }),
    [userData]
  )
  return <userDataContext.Provider value={value}> {children} </userDataContext.Provider>
}
