import React from 'react'
import { AuthProvider } from './hooks/useAuth'
import { SnackBarProvider } from './hooks/useSnackBar'
import { PopupProvider } from './hooks/usePopopManager'
import { UserStateProvider } from './hooks/useUserState'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PopupProvider>
      <SnackBarProvider>
        <AuthProvider>
          <UserStateProvider>{children}</UserStateProvider>
        </AuthProvider>
      </SnackBarProvider>
    </PopupProvider>
  )
}
