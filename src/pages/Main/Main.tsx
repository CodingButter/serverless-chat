import React from 'react'
import MainContent from './components/maincontent/MainContent'
import ServerList from './components/serverlist/ServerList'
import useApi from '../../hooks/useApi'

export default function Main() {
  const { loading, response: servers, error } = useApi('/read/servers')
  return (
    <div className="w-full h-full flex justify-center items-center">
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}
      {servers && (
        <>
          <ServerList servers={servers} />
          <MainContent servers={servers} />
        </>
      )}
    </div>
  )
}
