import React, { forwardRef, useEffect, useRef } from 'react'
import classNames from 'classnames'

interface InputProps extends React.ComponentPropsWithRef<'input'> {
  className?: string
  onEnter?: () => void
  focus?: boolean
}

const Input = forwardRef(({ className, onEnter, focus, ...rest }: InputProps, ref) => {
  const inputRef = useRef<any>(null)
  useEffect(() => {
    let keydownListener: any
    if (inputRef.current) {
      if (focus) {
        inputRef?.current?.focus()
      }
      keydownListener = inputRef?.current?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          onEnter?.()
        }
      })
    }
    return () => {
      if (keydownListener) {
        inputRef?.current?.removeEventListener?.('keydown', keydownListener)
      }
    }
  }, [inputRef?.current, focus])
  const classes = classNames('w-full p-2 rounded bg-skin-muted/10 text-skin-inverted', className)
  return <input ref={inputRef} className={classNames('rounded p-2 bg-skin-base', className)} {...rest} />
})
export default Input
