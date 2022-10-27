import React, { useEffect, useState } from 'react'
import { useFetchTemplate, mergeTemplates } from '../../../../../hooks/useTemplateLoader'
import friendsIcon from '../../../../../assets/icons/friends-server-icon.png'
import communityIcon from '../../../../../assets/icons/community-server-icon.png'
import { Server } from '../../../../../types/server'
import OutlineButton from '../OutlineButton'
interface TellMoreProps extends React.ComponentPropsWithRef<'div'> {
  next: () => void
  prev: () => void
  updateServer: (server: Server) => void
}

export default function TellMore({ prev, next, updateServer }: TellMoreProps) {
  return (
    <div className="flex flex-col gap-2 relative">
      <div className="w-[600px] p-4 gap-2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-black">Tell me more about your server</h2>
        <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
          In order to help you with your setup, is your new server for just friends or for a community?
        </p>
        <div className="flex flex-col overflow-y-auto justify-start items-center w-full gap-2">
          <div className="flex flex-col w-full gap-2">
            <OutlineButton
              icon={friendsIcon}
              onClick={next}
              imgClassName="shadow-md bg-green-500/50 border border-skin-base"
              label="Friends"
              description="A server for you and your friends"
            />
            <OutlineButton
              icon={communityIcon}
              onClick={next}
              imgClassName="shadow-md bg-green-500/50 text-skin-base border border-skin-base"
              label="Community"
              description="A server for a community"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full min-h-[75px] text-skin-inverted"></div>
      <div className="absolute bottom-0 left-0 z-10">
        <button onClick={prev} className="text-skin-inverted flex items-center justify-center mb-3 ml-3 text-sm">
          Back
        </button>
      </div>
    </div>
  )
}
