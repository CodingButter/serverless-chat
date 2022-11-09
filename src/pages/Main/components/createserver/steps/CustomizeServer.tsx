import React, { useState, useRef } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { HiCamera } from 'react-icons/hi'
import { FileUploader } from 'react-drag-drop-files'
import Input from '../../../../../components/Input'
import { Server } from '../../../../../types/server'
import { User } from '../../../../../types/user'
import Button from '../../Button'

interface CustomizeServerProps extends React.ComponentPropsWithRef<'div'> {
  next: () => void
  prev: () => void
  createServer: ({ name }: Partial<Server>, icon: File) => void
  user: User
}
const fileType = ['JPEG', 'PNG', 'GIF']
export default function CustomizeServer({ next, prev, createServer, user }: CustomizeServerProps) {
  const [name, setName] = useState<string>(
    `${user.username?.charAt(0).toUpperCase()}${user?.username?.slice(1)}'s Server`
  )
  const [serverIcon, setServerIcon] = useState<File | null>(null)

  const handleFileDragDrop = (file: File) => {
    console.log({ file })
    setServerIcon(file)
  }

  const handleCreateServer = () => {
    name && serverIcon && createServer({ name }, serverIcon)
  }

  return (
    <div className="flex flex-col gap-2 relative">
      <div className="w-[600px] p-4 gap-2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-black">Customize your server</h2>
        <p className="text-skin-muted text-sm max-w-[400px] text-center p-2">
          Give your new server a personality with a name and an icon. You can always change it later.
        </p>
        <div className="flex flex-col justify-start items-center w-full gap-2">
          <div className="flex flex-col w-full gap-2">
            <div className="w-full flex justify-center items-center">
              <FileUploader
                multiple={false}
                classes="flex cursor-pointer flex-col gap-2 text-skin-inverted w-[70px] h-[70px] rounded-full border-2 border-blue-500 shadow-lg p-[2px] border-dashed"
                types={fileType}
                name="serverIcon"
                handleChange={handleFileDragDrop}
              >
                <div className="w-full h-full flex flex-col items-center justify-center bg-white relative rounded-full">
                  <div className="w-[30px] h-[30px] rounded-full bg-blue-500 p-1 absolute -top-2 -right-3 border-[3px] border-white flex justify-center items-center">
                    <AiOutlinePlus className="text-2xl text-white" />
                  </div>
                  {serverIcon ? (
                    <img className="w-full h-full rounded-full object-cover" src={URL.createObjectURL(serverIcon)} />
                  ) : (
                    <HiCamera className="text-3xl text-skin-muted" />
                  )}
                </div>
              </FileUploader>
            </div>
            <label htmlFor="server-name" className="text-skin-muted font-bold text-sm">
              Server name
            </label>
            <Input
              className="w-[250px]"
              id="server-name"
              value={name}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-4 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full min-h-[75px] text-skin-inverted">
        <div className="w-full items-center justify-end flex">
          <Button onClick={handleCreateServer}>Create</Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0">
        <button onClick={prev} className="text-skin-inverted flex items-center justify-center mb-3 ml-3 text-sm">
          Back
        </button>
      </div>
    </div>
  )
}
