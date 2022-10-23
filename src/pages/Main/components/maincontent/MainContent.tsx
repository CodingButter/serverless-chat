import React from 'react'
import useApi from '../../../../hooks/useApi'
import { usePopup } from '../../../../hooks/usePopopManager'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
export default function MainContent({ servers }: { servers: any }) {
  const { openPopup, closePopup } = usePopup()

  const handleCreateServer = () => {
    openPopup(<CreateServer closePopup={closePopup} />)
  }
  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-4">
      {!servers && (
        <>
          <h1 className="text-4xl">It's Lonely in here</h1>
          <p className="text-2xl">Why not add a server?</p>
          <ServerButton onClick={handleCreateServer} />
        </>
      )}
    </div>
  )
}
