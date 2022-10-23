import React, { Children } from 'react'
import { useSpring, animated } from 'react-spring'

interface StepProps extends React.ComponentPropsWithRef<'div'> {
  children: React.ReactNode
  step: number
}

export default function MultiStep({ children, step }: StepProps) {
  const [stepStyle] = useSpring(() => ({
    transform: `translateX(-${step * 100}%)`,
    config: { velocity: 0.003, mass: 0.7, tension: 500, friction: 24 }
  }))

  return (
    <div className="w-full h-full flex justify-start items-center overflow-hidden relative">
      {Children.map(children, (child, index) => (
        <animated.div
          style={stepStyle}
          className="w-[100%] h-full flex justify-start items-center overflow-hidden relative"
        >
          {child}
        </animated.div>
      ))}
    </div>
  )
}
