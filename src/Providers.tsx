import React from 'react'
import { AuthProvider } from './hooks/useAuth'
import { SnackBarProvider } from './hooks/useSnackBar'
import { ModalProvider } from './hooks/useModal'
import { UserStateProvider } from './hooks/useUserState'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <SnackBarProvider>
        <ModalProvider>
          <UserStateProvider>{children}</UserStateProvider>
        </ModalProvider>
      </SnackBarProvider>
    </AuthProvider>
  )
}
