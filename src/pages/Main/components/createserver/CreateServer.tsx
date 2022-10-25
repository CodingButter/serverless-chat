import React, { useEffect, useState } from 'react'
import MultiStep from '../../../../components/MultiStep'
import SelectTemplate from './steps/SelectTemplate'
import EditServer from './steps/EditServer'
import CreateServerStepThree from './steps/CreateServerStepThree'
import { Server } from '../../../../types/server'
export interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
}

export default function CreateServer({ closeModal }: ContainerProps) {
  const [step, setStep] = useState<number>(0)
  const [templatePath, setTemplatePath] = useState<string | null>(null)
  const [server, setServer] = useState<Server | null>(null)
  useEffect(() => {
    console.log({ server })
  }, [server])
  return (
    <div className="flex flex-col justify-center items-center rounded shadow-lg relative bg-white thin-scroll">
      <MultiStep step={step}>
        <SelectTemplate closeModal={closeModal} setTemplatePath={setTemplatePath} setStep={setStep} />
        <EditServer
          closeModal={closeModal}
          templatePath={templatePath}
          server={server}
          setServer={setServer}
          setStep={setStep}
        />
        <CreateServerStepThree closeModal={closeModal} setStep={setStep} />
      </MultiStep>
    </div>
  )
}
