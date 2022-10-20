import React from 'react'

export interface OutlineButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon: string
  label: string
}

export default function OutlineButton({ icon, label }: OutlineButtonProps) {
  return (
    <button className="border rounded-lg flex w-full py-3 px-4 text-black items-center">
      <div className="flex gap-4 items-center">
        <img className="w-[45px] h-[45px]" src={icon} />
        <h3 className="font-bold">{label}</h3>
      </div>
    </button>
  )
}
