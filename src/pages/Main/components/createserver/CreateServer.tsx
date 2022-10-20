import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import OutlineButton from './OutlineButton'
import defaultTemplate from '../../../../assets/server_templates/default_template'
import serverTemplates from '../../../../assets/server_templates/templates'
export interface ContainerProps extends React.ComponentPropsWithRef<'div'> {
  closePopup: () => void
}
export default function CreateServer({ closePopup }: ContainerProps) {
  return (
    <div className="py-4 px-4 pb-[100px] gap-2 flex flex-col justify-center items-center rounded shadow-lg relative bg-white thin-scroll">
      <div className="absolute right-0 top-0 text-skin-muted">
        <button onClick={closePopup} className="flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-black">Create a server</h2>
      <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
        Your Server is where you and your friends hang out. Make yours and start talking.
      </p>
      <div className="flex flex-col overflow-y-auto justify-start items-center w-full gap-2 max-h-[300px]">
        <OutlineButton label={defaultTemplate.label} icon={defaultTemplate.icon} />
        <p className="font-bold text-skin-inverted text-sm text-left w-full p-2 uppercase">Start from a template</p>
        {serverTemplates.map((template, index, arr) => (
          <OutlineButton key={template.label} label={template.label} icon={template.icon} />
        ))}
      </div>
      <div className="flex flex-col py-4 absolute bottom-0 left-0 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full h-[100px] text-skin-inverted">
        <h3 className="font-bold text-lg">Have an invite already?</h3>
        <button className="bg-skin-base/50 p-2 w-full rounded text-skin-base text-sm hover:bg-skin-base/70">
          Join a Server
        </button>
      </div>
    </div>
  )
}
