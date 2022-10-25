import React, { useEffect, useState } from 'react'
import MultiStep from '../../../../components/MultiStep'
import CreateServerStepOne from './steps/CreateServerStepOne'
import CreateServerStepTwo from './steps/CreateServerStepTwo'
import CreateServerStepThree from './steps/CreateServerStepThree'
export interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
}

export default function CreateServer({ closeModal }: ContainerProps) {
  const [step, setStep] = useState<number>(0)
  useEffect(() => {
    console.log({ step })
  }, [step])
  return (
    <div className="flex flex-col justify-center items-center rounded shadow-lg relative bg-white thin-scroll">
      <MultiStep step={step} setStep={setStep}>
        <CreateServerStepOne closeModal={closeModal} setStep={setStep} />
        <CreateServerStepTwo closeModal={closeModal} setStep={setStep} />
        <CreateServerStepThree closeModal={closeModal} setStep={setStep} />
      </MultiStep>
    </div>
  )
}
