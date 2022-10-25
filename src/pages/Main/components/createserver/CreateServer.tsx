import React, { useEffect, useState } from 'react'
import MultiStep from '../../../../components/MultiStep'
import SelectTemplate from './steps/SelectTemplate'
import EditServer from './steps/CustomizeServer'
import { AiOutlineClose } from 'react-icons/ai'
import { Server } from '../../../../types/server'
import { mergeTemplates, serverSchema } from '../../../../hooks/useTemplateLoader'
import TellMore from './steps/TellMore'

export interface CustomizeServerProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
}

export default function CustomizeServer({ closeModal }: CustomizeServerProps) {
  const [step, setStep] = useState<number>(0)
  const [templatePath, setTemplatePath] = useState<string | null>(null)
  const [server, setServer] = useState<Server>(serverSchema)

  const updateServer = (newServer: Partial<Server>) => {
    setServer(mergeTemplates(server, newServer))
  }

  const nextStep = () => {
    setStep(step + 1)
  }

  return (
    <div className="flex flex-col rounded shadow-lg relative bg-white thin-scroll">
      <div className="absolute right-0 top-0">
        <button onClick={closeModal} className="text-skin-muted flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <MultiStep step={step}>
        <SelectTemplate setTemplatePath={setTemplatePath} next={nextStep} />
        <TellMore server={server} updateServer={updateServer} next={nextStep} />
        <EditServer templatePath={templatePath} server={server} updateServer={updateServer} next={nextStep} />
      </MultiStep>
      <div
        className={`${
          step > 0 ? 'opacity-100 transition-all delay-500' : 'opacity-0 transition-none'
        } absolute bottom-0 left-0`}
      >
        <button
          disabled={step === 0}
          onClick={() => setStep((currentStep) => currentStep - 1)}
          className="text-skin-inverted flex items-center justify-center mb-3 ml-3 text-sm"
        >
          Back
        </button>
      </div>
    </div>
  )
}
