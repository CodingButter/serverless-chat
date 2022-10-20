import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

export interface PopupType extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  closePopup: () => void
  closing: boolean
  setClosing: (closing: boolean) => void
}

export default function Popup({ children, closePopup, closing, setClosing, ...rest }: PopupType) {
  const popupStyles = useSpring({
    config: { velocity: 0.03, mass: 1.3, tension: 500, friction: 24 },
    to: !closing
      ? async (next, cancel) => {
          setClosing(false)
          await next({ opacity: 1, scale: 1 })
        }
      : async (next, cancel) => {
          await next({ opacity: 0, scale: 0 })
          closePopup()
        },
    from: !closing ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }
  })

  return (
    <div
      {...rest}
      className={`w-full h-full flex flex-col justify-center items-center gap-4 z-[100] top-0 left-0 absolute ${
        !closing ? 'bg-black/40' : 'bg-none'
      }`}
    >
      <button onClick={() => setClosing(true)} className="w-full h-full absolute top-0 left-0" />
      <animated.div style={popupStyles} className="z-[50]">
        {children}
      </animated.div>
    </div>
  )
}
