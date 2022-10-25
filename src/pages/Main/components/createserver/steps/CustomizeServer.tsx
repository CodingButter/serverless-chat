import React, { useEffect, useState } from 'react'
import { useFetchTemplate, mergeTemplates } from '../../../../../hooks/useTemplateLoader'

import { Server } from '../../../../../types/server'
interface EditServerProps extends React.ComponentPropsWithRef<'div'> {
  setStep: (step: number) => void
  templatePath: string | null
  updateServer: (server: Server) => void
  server: Server | null
}

export default function EditServer({ setStep, templatePath, updateServer, server }: EditServerProps) {
  const { template, loading } = useFetchTemplate(templatePath)
  const [name, setName] = useState<string>(server?.name || '')

  useEffect(() => {
    if (template && !loading) {
      updateServer(template)
    }
  }, [loading, template])

  return (
    <div className="flex flex-col gap-2">
      <div className="w-[600px] p-4 gap-2 flex flex-col justify-center items-center relative">
        <h2 className="text-2xl font-bold text-black">Customize your server</h2>
        <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
          Your Server is where you and your friends hang out. Make yours and start talking.
        </p>
        <div className="flex flex-col overflow-y-auto justify-start items-center w-full gap-2">
          <div className="flex flex-col w-full gap-2"></div>
        </div>
      </div>
      <div className="flex flex-col py-4 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full text-skin-inverted">
        <h3 className="font-bold text-lg">Have an invite already?</h3>
        <button
          onClick={() => setStep(2)}
          className="bg-skin-base/50 p-2 px-8 rounded text-skin-base text-sm hover:bg-skin-base/70"
        >
          Join a Server
        </button>
      </div>
    </div>
  )
}
