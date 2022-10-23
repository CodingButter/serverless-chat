import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'

export interface PopupType extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  closePopup: () => void
  closed: boolean
}

export default function Popup({ closePopup, closed, children, ...rest }: PopupType) {
  const [show, setShow] = useState<boolean>(false)
  const popupStyles = useSpring({
    config: { velocity: 0.003, mass: 0.7, tension: 500, friction: 24 },
    to: !closed
      ? async (next, cancel) => {
          setShow(true)
          await next({ opacity: 1, scaleY: 1 })
        }
      : async (next, cancel) => {
          await next({ opacity: 0, scaleY: 0 })
          setShow(false)
        },
    from: !closed ? { opacity: 0, scaleY: 0 } : { opacity: 1, scaleY: 1 }
  })

  return (
    <div
      {...rest}
      className={`w-full h-full flex flex-col justify-center items-center gap-4 ${
        !show ? 'z-[-100]' : 'z-[100]'
      } top-0 left-0 absolute ${closed ? 'bg-none' : 'bg-black/40'}`}
    >
      <button aria-label="close" onClick={closePopup} className="w-full h-full absolute top-0 left-0" />
      <animated.div style={popupStyles} className="z-[50]">
        {children}
      </animated.div>
    </div>
  )
}
