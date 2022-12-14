import cn from 'classnames'
import { ChangeEvent } from 'react'

import styles from './Input.module.scss'

export interface InputProps {
  text?: string
  placeholder?: string
  isReadOnly?: boolean
  onChange?: (value: string) => void
  className?: string
}

type Comp = (props: InputProps) => JSX.Element

const Input: Comp = (props) => {
  const { text, onChange, placeholder, isReadOnly = false, className } = props

  return (
    <input
      data-testid="input"
      className={cn(styles['input'], className)}
      placeholder={placeholder}
      readOnly={isReadOnly}
      value={text}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.currentTarget.value)
      }}
    ></input>
  )
}

export default Input
