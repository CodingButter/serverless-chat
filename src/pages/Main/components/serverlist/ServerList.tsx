import React from 'react'
import { usePopup } from '../../../../hooks/usePopopManager'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
import { useUserState } from '../../../../hooks/useUserState'
export default function ServerList({ servers }: { servers: any }) {
  const { openPopup, closePopup } = usePopup()
  const { userState, setUserState } = useUserState()
  const { selectedServer } = userState
  const handleCreateServer = () => {
    openPopup(<CreateServer closePopup={closePopup} />)
  }

  const handleSelectServer = (serverId: number) => {
    setUserState({ ...userState, selectedServer: serverId })
  }

  return (
    <div className="flex flex-col p-2 justify-start h-full gap-2">
      {servers?.map((server: any) => (
        <ServerButton
          selected={server.id == selectedServer}
          key={server.id}
          serverName={server.name}
          onClick={() => handleSelectServer(server.id)}
          avatar={server?.ServerSettings?.avatar}
        />
      ))}
      <ServerButton onClick={handleCreateServer} />
    </div>
  )
}
