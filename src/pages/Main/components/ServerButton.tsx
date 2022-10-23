import React from 'react'
import classNames from 'classnames'
import { AiOutlinePlus } from 'react-icons/ai'

export interface ServerButtonType extends React.ComponentPropsWithRef<'button'> {
  serverName?: string
  selected?: boolean
  avatar?: string
}

export default function ServerButton({ serverName, avatar, className, selected, ...rest }: ServerButtonType) {
  return (
    <button
      {...rest}
      title={serverName || 'Create Server'}
      className={classNames(
        'server-button',
        selected ? 'selected' : '',
        'relative flex items-center justify-center px-2'
      )}
    >
      <div className="flex justify-center items-center absolute h-full w-1 left-0 top-0">
        <div className="indicator w-full h-[4px] rounded-lg  bg-white transition-all duration-500"></div>
      </div>
      <div className="relative text-4xl w-[50px] h-[50px] flex justify-center items-center bg-skin-surface overflow-hidden rounded-full shadow-lg">
        {avatar ? (
          <img src={avatar} alt="avatar" className="min-w-full min-h-full object-cover" />
        ) : (
          <span className="text-3xl">{serverName?.charAt(0)}</span>
        )}
        {!avatar && !serverName && <AiOutlinePlus />}
      </div>
    </button>
  )
}
