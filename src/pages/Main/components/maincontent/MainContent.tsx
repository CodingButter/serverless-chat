import React from 'react'
import { useUserData } from '../../../../hooks/useUserManager'
import { usePopup } from '../../../../hooks/usePopopManager'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
export default function MainContent() {
  const { userData } = useUserData()
  const { setPopup, setClosing } = usePopup()
  const closePopup = () => {
    setClosing(true)
  }
  const handleCreateServer = () => {
    setPopup(<CreateServer closePopup={closePopup} />)
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      {!userData.servers && (
        <>
          <h1 className="text-4xl">It's Lonely in here</h1>
          <p className="text-2xl">Why not add a server?</p>
          <ServerButton onClick={handleCreateServer} />
        </>
      )}
    </div>
  )
}
