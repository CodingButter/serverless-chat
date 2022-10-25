import React, { useEffect, useState } from 'react'
import { useFetchTemplate, mergeTemplates } from '../../../../../hooks/useTemplateLoader'

import { Server } from '../../../../../types/server'
import OutlineButton from '../OutlineButton'
interface TellMoreProps extends React.ComponentPropsWithRef<'div'> {
  next: () => void
  updateServer: (server: Server) => void
  server: Server | null
}

export default function TellMore({ next, updateServer, server }: TellMoreProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="w-[600px] p-4 gap-2 flex flex-col justify-center items-center relative">
        <h2 className="text-2xl font-bold text-black">Tell me more about your server</h2>
        <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
          In order to help you with your setup, is your new server for just friends or for a community?
        </p>
        <div className="flex flex-col overflow-y-auto justify-start items-center w-full gap-2">
          <div className="flex flex-col w-full gap-2">
            <OutlineButton label="Friends" description="A server for you and your friends" />
            <OutlineButton label="Community" description="A server for a community" />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full text-skin-inverted h-20"></div>
    </div>
  )
}
