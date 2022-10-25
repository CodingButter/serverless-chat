import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

export interface OutlineButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: string
  label: string
}

export default function OutlineButton({ icon, label, ...rest }: OutlineButtonProps) {
  return (
    <button
      {...rest}
      className="bg-skin-base bg-opacity-0 hover:bg-opacity-10 border rounded-lg flex w-full py-3 px-4 text-black items-center justify-between"
    >
      <div className="flex gap-4 items-center">
        <img className="w-[40px] h-[40px]" src={icon} />
        <h3 className="font-bold capitalize">{label}</h3>
      </div>
      <FaChevronRight />
    </button>
  )
}
