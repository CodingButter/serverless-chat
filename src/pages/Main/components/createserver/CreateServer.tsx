import React, { Suspense, useEffect, useState } from 'react'
import MultiStep from '../../../../components/MultiStep'
import SelectTemplate from './steps/SelectTemplate'
import CustomizeServer from './steps/CustomizeServer'
import TellMore from './steps/TellMore'
import { AiOutlineClose } from 'react-icons/ai'
import { Server } from '../../../../types/server'
import { mergeTemplates } from '../../../../hooks/useTemplateLoader'
import { useAuth } from '../../../../hooks/useAuth'

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

  const nextStep = () => {
    setStep(step + 1)
  }

  const prev = () => {
    setStep(step - 1)
  }

  return (
    <div className="flex-col rounded shadow-lg relative bg-white thin-scroll">
      <div className="absolute right-0 top-0">
        <button onClick={closeModal} className="text-skin-muted flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <MultiStep step={step}>
        <SelectTemplate setServer={setServer} next={nextStep} />
        <TellMore prev={prev} updateServer={updateServer} next={nextStep} />
        {<CustomizeServer user={user} prev={prev} updateServer={updateServer} next={nextStep} />}
      </MultiStep>
    </div>
  )
}
