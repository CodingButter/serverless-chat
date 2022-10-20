import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
  inputRef?: any
}

function Input({ className, inputRef, ...rest }: InputProps) {
  return <input ref={inputRef} className={classNames('rounded p-2 bg-skin-base', className)} {...rest} />
}
export default Input
