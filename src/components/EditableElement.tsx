import React, { useState } from 'react'
import Input from './Input'

interface EditableElementProps extends React.ComponentPropsWithRef<any> {
  value?: string | number | boolean | null
  onClick?: (value?: any) => void
  inputClassName?: string
  inputType?: string
}

export default function EditableElement({
  onClick,
  value,
  onChange,
  className,
  inputClassName,
  inputType,
  ...props
}: EditableElementProps) {
  const [editing, setEditing] = useState<boolean>(false)
  return editing ? (
    <Input
      {...props}
      onBlur={() => setEditing(false)}
      onEnter={() => setEditing(false)}
      type={inputType}
      className={inputClassName}
      value={value as string | number}
      onChange={onChange}
    />
  ) : (
    <button className={className} onClick={() => setEditing(true)} {...props}>
      {value}
    </button>
  )
}
