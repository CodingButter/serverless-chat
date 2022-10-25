import React, { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { RiCheckboxCircleLine } from 'react-icons/ri'
import { BsClipboardCheck } from 'react-icons/bs'
import { QRCodeCanvas } from 'qrcode.react'

export interface PrivateKeyDisplayProps extends React.ComponentPropsWithRef<'div'> {
  closeModal: () => void
  privateKey: string
  username: string
}

export default function PrivateKeyDisplay({ closeModal, privateKey, username }: PrivateKeyDisplayProps) {
  const keyBlob = new Blob([privateKey], { type: 'text/plain' })
  const [showQr, setShowQr] = useState<boolean>(true)
  const [copied, setCopied] = useState<boolean>(false)
  const [qrSize, setQrSize] = useState<number>(0)
  const copyToClipboard = () => {
    navigator.clipboard.writeText(privateKey)
    setCopied(true)
  }
  useEffect(() => {
    setQrSize(Math.max(200, Math.floor(window.innerHeight / 3)))
  }, [])

  return (
    <div className="py-4 px-4 max-w-[600px] pb-[75px] gap-2 flex flex-col justify-center items-center rounded shadow-lg relative bg-white thin-scroll">
      <div className="absolute right-0 top-0 text-skin-muted">
        <button onClick={closeModal} className="flex items-center justify-center mt-3 mr-3 text-2xl">
          <AiOutlineClose />
        </button>
      </div>
      <h2 className="text-2xl font-bold text-black pt-5">User Registered</h2>
      <p className="text-black/60 text-sm max-w-[300px] flex flex-col items-center justify-start text-center">
        <span className="font-bold">SAVE THIS KEY</span>
        <span>This is how you can change your password or login somewhere else</span>
      </p>
      <div className="flex flex-col overflow-hidden p-1 rounded-md bg-skin-base mb-2">
        <div className="flex w-full">
          <button
            onClick={() => setShowQr(!showQr)}
            className={`${
              showQr ? 'bg-green-600 text-white' : 'bg-white text-skin-inverted'
            } w-full py-1 rounded-tl-md hover:bg-opacity-50 transition-all duration-500`}
          >
            QrCode
          </button>
          <button
            onClick={() => setShowQr(!showQr)}
            className={`${
              !showQr ? 'bg-green-600 text-white' : 'bg-white text-skin-inverted'
            } w-full py-1 rounded-tr-md hover:bg-opacity-50 transition-all duration-500`}
          >
            Raw Text
          </button>
        </div>
        <div
          className="relative bg-skin-base rounded-b-md shadow-sm overflow-hidden"
          style={{ width: `${qrSize}px`, height: `${qrSize}px` }}
        >
          <div
            className={`${
              !showQr && '-translate-x-[50%]'
            } w-[200%] flex justify-start items-center transition-all duration-500`}
          >
            <QRCodeCanvas value={privateKey} size={qrSize} className="border-white border-2 rounded-b-md" />
            <textarea
              readOnly
              value={privateKey}
              style={{ height: `${qrSize}px`, width: `${qrSize}px` }}
              className={` w-full p-2 rounded-b-md text-black text-sm`}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col py-1 mt absolute bottom-0 left-0 px-4 justify-center gap-2 items-center bg-skin-muted/10 w-full h-[75px] text-skin-inverted">
        <div className="flex justify-center items-center min-w-[150px] w-full overflow-hidden rounded shadow-sm hover:shadow-lg transition-all duration-500">
          <a
            href={window?.URL.createObjectURL(keyBlob)}
            className="transition-all duration-500 bg-skin-base/50 text-center p-2 w-full text-skin-base text-sm hover:bg-skin-base/70"
            download={`${username.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-private-key.txt`}
          >
            Download Private Key
          </a>
          <button
            onClick={copyToClipboard}
            className={`font-bold text-xl w-[15%] h-full justify-center items-center ${
              copied ? 'bg-green-600' : 'bg-white'
            } text-skin-base hover:bg-green-600 hover:bg-opacity-50 hover:text-white transition-all duration-500 flex`}
          >
            <BsClipboardCheck
              className={`${!copied ? 'scale-100' : 'scale-0 w-0 h-0'} text-skin-inverted transition-all duration-500`}
            />
            <RiCheckboxCircleLine
              className={`${copied ? 'scale-100' : 'scale-0 w-0 h-0'} text-skin-base transition-all duration-500`}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
