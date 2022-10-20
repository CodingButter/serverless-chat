import React from 'react'
import MainContent from './components/maincontent/MainContent'
import ServerList from './components/serverlist/ServerList'
export default function Main() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <ServerList />
      <MainContent />
    </div>
  )
}
