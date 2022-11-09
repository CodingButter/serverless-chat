import React, { Suspense, useEffect, useState } from 'react'
import MultiStep from '../../../../components/MultiStep'
import SelectTemplate from './steps/SelectTemplate'
import CustomizeServer from './steps/CustomizeServer'
import TellMore from './steps/TellMore'
import { AiOutlineClose } from 'react-icons/ai'
import { Server } from '../../../../types/server'
import { mergeTemplates } from '../../../../hooks/useTemplateLoader'
import { useAuth } from '../../../../hooks/useAuth'
import { fetchData } from '../../../../hooks/useApi'

export interface CreateServerProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
}

export default function CreateServer({ closeModal }: CreateServerProps) {
  const { user } = useAuth()
  const [step, setStep] = useState<number>(0)
  const [templatePath, setTemplatePath] = useState<string | null>(null)
  const [server, setServer] = useState<Partial<Server> | null>()

  const updateServer = (newServer: Partial<Server>) => {
    server && setServer(mergeTemplates({ defaultTemplate: server, mergingTemplate: newServer }))
  }

  const createServer = async ({ name }: Partial<Server>, serverIcon: File) => {
    if (server) {
      const formData = new FormData()
      formData.append('serverIcon', serverIcon)
      formData.append('server', JSON.stringify({ ...server, name }))
      const res = await fetchData('/create/server', formData, user.token, true)
      console.log({ res })
    }
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  const prev = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex-col rounded shadow-lg relative bg-white thin-scroll">
      <div className="absolute right-0 top-0 z-10">
        <button onClick={closeModal} className="text-skin-muted flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <MultiStep step={step}>
        <SelectTemplate setServer={setServer} next={nextStep} />
        <TellMore prev={prev} updateServer={updateServer} next={nextStep} />
        {<CustomizeServer user={user} prev={prev} createServer={createServer} next={nextStep} />}
      </MultiStep>
    </div>
  )
}
