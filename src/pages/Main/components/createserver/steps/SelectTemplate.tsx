import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import OutlineButton from '../OutlineButton'
import { useFetchTemplates } from '../../../../../hooks/useTemplateLoader'
import { ServerTemplate } from '../../../../../types/server'
const templatesUrl =
  'https://raw.githubusercontent.com/CodingButter/serverless-chat/main/src/assets/server_templates/templates.json'
interface SelectTemplateProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
  setStep: (step: number) => void
  setTemplatePath: (templatepath: string | null) => void
}

export default function SelectTemplate({ closeModal, setStep, setTemplatePath }: SelectTemplateProps) {
  const { templates, loading, error } = useFetchTemplates(templatesUrl)
  const { default_template, additional_templates } = templates || {}

  const handleTemplateSelect = (template: ServerTemplate) => {
    setTemplatePath(template.template_path)
    setStep(1)
  }
  return (
    <div className="w-[400px] pb-[100px] py-4 px-4 h-full gap-2 flex flex-col justify-center items-center relative thin-scroll">
      <div className="absolute right-0 top-0 text-skin-muted">
        <button onClick={closeModal} className="flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-black">Create a server</h2>
      <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
        Your Server is where you and your friends hang out. Make yours and start talking.
      </p>
      {loading && <div>loading...</div>}
      <div className="flex flex-col overflow-y-auto justify-start items-center w-full gap-2 h-[300px]">
        {templates && default_template && additional_templates && (
          <>
            <OutlineButton
              onClick={() => handleTemplateSelect(default_template)}
              label={default_template.label}
              icon={default_template.icon}
              description={default_template?.description}
            />
            <p className="font-bold text-skin-inverted text-sm text-left w-full p-2 uppercase">Start from a template</p>
            {additional_templates.map((template: ServerTemplate, index, arr) => (
              <OutlineButton
                key={template.label}
                label={template.label}
                icon={template.icon}
                description={template.description}
                onClick={() => handleTemplateSelect(template)}
              />
            ))}
          </>
        )}
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
