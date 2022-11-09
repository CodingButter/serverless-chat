import React from 'react'
import classNames from 'classnames'

export interface ButtonProps extends React.ComponentPropsWithRef<'button'> {
  primary?: boolean
  muted?: boolean

  danger?: boolean
}

export default function Button({ children, className, primary = true, muted, danger, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={classNames(
        'px-6 py-2 text-center hover:bg-opacity-75 text-white rounded-sm',
        primary && 'bg-skin-button-base',
        muted && 'bg-kin-button-muted',
        danger && 'bg-skin-button-danger',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
