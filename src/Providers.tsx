import React from 'react'
import { AuthProvider } from './hooks/useAuth'
import { SnackBarProvider } from './hooks/useSnackBar'
import { ModalProvider } from './hooks/useModal'
import { UserStateProvider } from './hooks/useUserState'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <SnackBarProvider>
        <AuthProvider>
          <UserStateProvider>{children}</UserStateProvider>
        </AuthProvider>
      </SnackBarProvider>
    </ModalProvider>
  )
}
