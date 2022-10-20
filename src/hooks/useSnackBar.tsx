import React, { useState, useContext, createContext, useMemo } from 'react'

type SnackBarContextType = {
  snackBars: SnackBarType[]
  addSnackBar: (snackBar: SnackBarType) => void
}

const SnackBarContext = createContext<SnackBarContextType | any>({})
export const useSnackBar = () => useContext(SnackBarContext)

interface SnackBarProps {
  children: React.ReactNode
}

export type SnackBarType = {
  key: string
  open: boolean
  message: string
  position: 'top-center' | 'top-right' | 'top-left' | 'bottom-center' | 'bottom-right' | 'bottom-left'
  type: 'success' | 'error' | 'warning' | 'info'
  yesLabel: string
  onYes?: () => void
  onNo?: () => void
  color?: string
  buttonStyle?: React.CSSProperties
  containerStyle?: React.CSSProperties
  timeout?: number
  closeOnClick?: boolean
}

export function SnackBarProvider({ children }: SnackBarProps) {
  const [snackBars, setSnackBars] = useState<SnackBarType[]>([])

  const removeSnackBar = ({ key }: SnackBarType) => {
    setSnackBars((prev) => prev.filter((snackBar) => snackBar.key !== key))
  }

  const addSnackBar = (snack: SnackBarType) => {
    const defaults: SnackBarType = {
      key: `${Date.now()}-snack-bar`,
      open: true,
      message: '',
      position: 'bottom-center',
      color: 'black',
      type: 'info',
      yesLabel: 'Ok',
      closeOnClick: true
    }
    setSnackBars([...snackBars.filter(({ open }) => open), ...[{ ...defaults, ...snack }]])
  }
  const value = useMemo(
    () => ({
      snackBars,
      addSnackBar
    }),
    [snackBars]
  )
  return <SnackBarContext.Provider value={value}>{children}</SnackBarContext.Provider>
}
