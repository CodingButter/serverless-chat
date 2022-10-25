import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import OutlineButton from '../OutlineButton'
import defaultTemplate from '../../../../../assets/server_templates/default_template'
import serverTemplates from '../../../../../assets/server_templates/templates'
interface StepOneProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
  setStep: (step: number) => void
}

export default function CreateServerStepTwo({ closeModal, setStep }: StepOneProps) {
  return (
    <div className="w-[800px] pb-[100px] gap-2 flex flex-col justify-center items-center thin-scroll relative">
      <div className="absolute right-0 top-0 text-skin-muted">
        <button onClick={closeModal} className="flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-black">Create a server</h2>
      <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
        Your Server is where you and your friends hang out. Make yours and start talking.
      </p>
      <div className="flex flex-col py-4 absolute bottom-0 left-0 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full h-[100px] text-skin-inverted">
        <h3 className="font-bold text-lg">Have an invite already?</h3>
        <button
          onClick={() => setStep(2)}
          className="bg-skin-base/50 p-2 w-full rounded text-skin-base text-sm hover:bg-skin-base/70"
        >
          Join a Server
        </button>
      </div>
    </div>
  )
}
