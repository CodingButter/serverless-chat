import React, { useContext, createContext, useState } from 'react'
import Modal from '../components/Modal'

type ModalContext = {
  Modal: React.ReactNode
  openModal: (popup: React.ReactNode) => void
  closeModal: () => void
  closed: boolean
}

const modalContext = createContext<ModalContext>({
  closed: true,
  Modal: () => {},
  openModal: () => {},
  closeModal: () => {}
})

export const useModal = () => useContext(modalContext)

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [closed, setClosed] = useState<boolean>(true)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const closeModal = () => {
    setClosed(true)
  }
  const openModal = (content: React.ReactNode) => {
    setModalContent(content)
    setClosed(false)
  }
  const modal = (
    <Modal closed={closed} closeModal={closeModal}>
      {modalContent}
    </Modal>
  )

  const value = React.useMemo(
    () => ({
      Modal: modal,
      closeModal,
      closed,
      openModal
    }),
    [modal, closed]
  )

  return <modalContext.Provider value={value}>{children}</modalContext.Provider>
}
