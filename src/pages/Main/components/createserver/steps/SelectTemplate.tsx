import React, { Suspense, useState } from 'react'
import OutlineButton from '../OutlineButton'
import useWindowSize from '../../../../../hooks/useWindowSize'
import { useFetchTemplates, useFetchTemplate } from '../../../../../hooks/useTemplateLoader'
import { Server, ServerTemplate, Templates } from '../../../../../types/server'
const url =
  'https://raw.githubusercontent.com/CodingButter/serverless-chat/main/src/assets/server_templates/templates.json'

interface TemplatesProps {
  handleSetServer: (server?: Server) => void
}
let templates: Templates
const TemplatesButtons = ({ handleSetServer }: TemplatesProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  if (!templates) {
    throw useFetchTemplates({ url }).then((data) => (templates = data))
  }
  const { default_template, additional_templates } = templates as unknown as Templates
  if (templates && loading) {
    throw new Promise(() => {})
  }
  const handleGetTemplate = async ({ template_path }: ServerTemplate) => {
    setLoading(true)
    handleSetServer(await useFetchTemplate({ url: template_path }))
    setLoading(false)
  }
  return (
    <>
      <OutlineButton
        onClick={() => handleGetTemplate(default_template)}
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
          onClick={() => handleGetTemplate(template)}
        />
      ))}
    </>
  )
}

interface SelectTemplateProps extends React.ComponentPropsWithRef<'div'> {
  next: () => void
  setServer: (server: Server) => void
}
export default function SelectTemplate({ next, setServer }: SelectTemplateProps) {
  const [windowWidth, windowHeight] = useWindowSize()

  const handleSetServer = async (newServer?: Server) => {
    newServer && setServer(newServer)
    next()
  }

  return (
    <div className="flex flex-col relative">
      <div className="w-[600px] p-4 pb-0 gap-2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-black">Create a Server</h2>
        <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
          Your Server is where you and your friends hang out. Make yours and start talking.
        </p>

        <div
          className="flex flex-col overflow-y-auto pb-2 justify-start items-center w-full gap-2 min-h-[120px]"
          style={{ maxHeight: windowHeight / 3 }}
        >
          <Suspense fallback={<div className="text-skin-inverted">Loading</div>}>
            <TemplatesButtons handleSetServer={handleSetServer} />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col py-4 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full text-skin-inverted">
        <h3 className="font-bold text-lg">Have an invite already?</h3>
        <button className="bg-skin-base/50 p-2 px-4 rounded text-skin-base text-sm hover:bg-skin-base/70">
          Join a Server
        </button>
      </div>
    </div>
  )
}
