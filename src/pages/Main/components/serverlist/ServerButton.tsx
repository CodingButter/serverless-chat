import React from 'react'
import classNames from 'classnames'
import { AiOutlinePlus } from 'react-icons/ai'

export interface ServerButtonType extends React.ComponentPropsWithRef<'button'> {
  serverName?: string
  avatar?: string
}

export default function ServerButton({ serverName, avatar, className, ...rest }: ServerButtonType) {
  //avatar = avatar || 'https://cdn.shopify.com/s/files/1/0059/3061/4851/products/B9A0615_576x.jpg?v=1651738132'
  return (
    <button
      {...rest}
      className={classNames(
        'text-4xl w-14 h-14 flex justify-center items-center bg-skin-surface overflow-hidden rounded-full shadow-lg'
      )}
    >
      {avatar ? <img src={avatar} alt="avatar" className="min-w-full min-h-full object-cover" /> : <AiOutlinePlus />}
    </button>
  )
}
