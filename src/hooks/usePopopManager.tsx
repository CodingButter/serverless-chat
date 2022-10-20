import React, { useContext, createContext, useState } from 'react'

type PopupManager = {
  popup: React.ReactNode
  setPopup: (popup: React.ReactNode) => void
  closePopup: () => void
  closing: boolean
  setClosing: (closing: boolean) => void
}

const popupContext = createContext<PopupManager>({ popup: null, setPopup: () => {}, closePopup: () => {} })

export const usePopup = () => useContext(popupContext)

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<React.ReactNode>(null)
  const [closing, setClosing] = useState<boolean>(false)
  const closePopup = () => {
    setPopup(null)
  }

  const value = React.useMemo(
    () => ({
      popup,
      setPopup,
      closePopup,
      closing,
      setClosing
    }),
    [popup, closing]
  )

  return <popupContext.Provider value={value}>{children}</popupContext.Provider>
}
