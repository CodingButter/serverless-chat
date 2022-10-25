import React from 'react'
import { FaChevronRight } from 'react-icons/fa'

export interface OutlineButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: string | null
  label: string
  description: string
}

export default function OutlineButton({ icon, label, description, ...rest }: OutlineButtonProps) {
  return (
    <button
      {...rest}
      className="bg-skin-base bg-opacity-0 hover:bg-opacity-10 border rounded-lg flex w-full py-3 px-4 text-black items-center justify-between"
    >
      <div className="flex gap-4 justify-center items-center w-full h-full">
        {icon && <img className="w-[40px] h-[40px]" src={icon} />}
        <div className="relative h-full w-full flex justify-start items-center">
          <h3 className="font-bold capitalize">{label}</h3>
          <p className="text-skin-muted text-left text-[.7em] w-full absolute left-0 -bottom-2">{description}</p>
        </div>
      </div>
      <FaChevronRight />
    </button>
  )
}
