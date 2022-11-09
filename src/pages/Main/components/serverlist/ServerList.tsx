import React from 'react'
import { useModal } from '../../../../hooks/useModal'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
import { useUserState } from '../../../../hooks/useUserState'
export default function ServerList({ servers }: { servers: any }) {
  const { openModal, closeModal } = useModal()
  const { userState, setUserState } = useUserState()
  const { selectedServer } = userState
  const handleCreateServer = () => {
    openModal(<CreateServer closeModal={closeModal} />)
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
          avatar={server?.avatar}
        />
      ))}
      <ServerButton onClick={handleCreateServer} />
    </div>
  )
}
