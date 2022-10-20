import React, { useContext, createContext, useState } from 'react'

type PopupManager = {
  popup: React.ReactNode
  setPopup: (popup: React.ReactNode) => void
  closePopup: () => void
}

const popupContext = createContext<PopupManager>({ popup: null, setPopup: () => {}, closePopup: () => {} })

export const usePopup = () => useContext(popupContext)

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [popup, setPopup] = useState<React.ReactNode>(null)

  const closePopup = () => {
    setPopup(null)
  }

  const value = React.useMemo(
    () => ({
      popup,
      setPopup,
      closePopup
    }),
    [popup]
  )

  return <popupContext.Provider value={value}>{children}</popupContext.Provider>
}
