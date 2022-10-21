import React, { useContext, createContext, useState } from 'react'
import Popup from '../components/Popup'

type PopupManager = {
  Popup: React.ReactNode
  openPopup: (popup: React.ReactNode) => void
  closePopup: () => void
  closed: boolean
}

const popupContext = createContext<PopupManager>({
  closed: true,
  Popup: () => {},
  openPopup: () => {},
  closePopup: () => {}
})

export const usePopup = () => useContext(popupContext)

export function PopupProvider({ children }: { children: React.ReactNode }) {
  const [closed, setClosed] = useState<boolean>(true)
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
  const closePopup = () => {
    setClosed(true)
  }
  const openPopup = (content: React.ReactNode) => {
    setPopupContent(content)
    setClosed(false)
  }
  const popup = (
    <Popup closed={closed} closePopup={closePopup}>
      {popupContent}
    </Popup>
  )

  const value = React.useMemo(
    () => ({
      Popup: popup,
      closePopup,
      closed,
      openPopup
    }),
    [popup, closed]
  )

  return <popupContext.Provider value={value}>{children}</popupContext.Provider>
}
