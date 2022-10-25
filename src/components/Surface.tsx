import React from 'react'
import classNames from 'classnames'

interface Props {
  children: React.ReactNode
  className?: string
}
function Surface({ children, className, ...rest }: Props) {
  return (
    <div className={classNames('bg-skin-surface rounded shadow-lg px-12 py-4 flex flex-col', className)} {...rest}>
      {children}
    </div>
  )
}

export default Surface
