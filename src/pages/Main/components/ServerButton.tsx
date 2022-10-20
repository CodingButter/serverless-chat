import React from 'react'
import classNames from 'classnames'
import { AiOutlinePlus } from 'react-icons/ai'

export interface ServerButtonType extends React.ComponentPropsWithRef<'button'> {
  serverName?: string
  avatar?: string
}

export default function ServerButton({ serverName, avatar, className, ...rest }: ServerButtonType) {
  return (
    <button
      {...rest}
      className={classNames(
        'text-4xl w-[50px] h-[50px] flex justify-center items-center bg-skin-surface overflow-hidden rounded-full shadow-lg'
      )}
    >
      {avatar ? <img src={avatar} alt="avatar" className="min-w-full min-h-full object-cover" /> : <AiOutlinePlus />}
    </button>
  )
}
