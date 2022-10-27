import classNames from 'classnames'
import React from 'react'
import { FaChevronRight } from 'react-icons/fa'
import Image from '../../../../components/Image'
export interface OutlineButtonProps extends React.ComponentPropsWithRef<'button'> {
  icon?: string | null
  label: string
  description: string
  imgClassName?: string
}

export default function OutlineButton({ icon, label, description, imgClassName, ...rest }: OutlineButtonProps) {
  return (
    <button
      {...rest}
      className="bg-skin-base bg-opacity-0 hover:bg-opacity-10 border rounded-lg flex w-full py-2 px-4 text-black items-center justify-between"
    >
      <div className="flex gap-2 justify-center items-center w-full h-full">
        <div
          className={classNames(
            'w-[50px] h-[50px] rounded-lg overflow-hidden flex justify-center items-center',
            imgClassName
          )}
        >
          {icon ? (
            <Image className="object-cover min-w-full min-h-full" alt={label} src={icon} />
          ) : (
            <h3 className="text-2xl font-bold">{label[0]}</h3>
          )}
        </div>

        <div className="relative h-full w-full flex justify-start items-center">
          <h3 className="font-bold capitalize">{label}</h3>
          <p className="text-skin-muted text-left text-[.7em] w-full absolute left-0 -bottom-4">{description}</p>
        </div>
      </div>
      <FaChevronRight />
    </button>
  )
}
