import React, { forwardRef } from 'react'
import classNames from 'classnames'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
}

const Input = forwardRef(({ className, ...rest }: InputProps, ref) => {
  return <input className={classNames('rounded p-2 bg-skin-base', className)} {...rest} />
})
export default Input
