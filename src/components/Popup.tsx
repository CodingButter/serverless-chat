import React from 'react'

export interface PopupType extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  closePopup: () => void
}

export default function Popup({ children, closePopup, ...rest }: PopupType) {
  return (
    <div
      {...rest}
      className="w-full h-full flex flex-col justify-center items-center gap-4 z-[100] top-0 left-0 absolute bg-black/40"
    >
      <button onClick={closePopup} className="w-full h-full absolute top-0 left-0" />
      <div className="z-[50]">{children}</div>
    </div>
  )
}
