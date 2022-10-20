import React from 'react'
import { useUserData } from '../../../../hooks/useUserManager'
import { usePopup } from '../../../../hooks/usePopopManager'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
export default function ServerList() {
  const { userData } = useUserData()
  const { setPopup } = usePopup()

  const handleCreateServer = () => {
    setPopup(<CreateServer />)
  }
  return (
    <div className="flex flex-col p-2 justify-start h-full">
      {userData?.servers?.map((server) => (
        <ServerButton serverName={server.name} avatar={server?.ServerSettings?.avatar} />
      ))}
      <ServerButton onClick={handleCreateServer} />
    </div>
  )
}
