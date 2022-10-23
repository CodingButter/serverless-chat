import React from 'react'
import useApi from '../../../../hooks/useApi'
import { useModal } from '../../../../hooks/useModal'
import ServerButton from '../ServerButton'
import CreateServer from '../createserver/CreateServer'
import { useUserState } from '../../../../hooks/useUserState'
export default function MainContent({ servers }: { servers: any }) {
  const { userState } = useUserState()
  const { selectedServer } = userState
  const server = servers.find((server: any) => server.id == selectedServer)
  const { openModal, closeModal } = useModal()

  const handleCreateServer = () => {
    openModal(<CreateServer closeModal={closeModal} />)
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
      {server && <h1 className="text-4xl">{server.name}</h1>}
    </div>
  )
}
