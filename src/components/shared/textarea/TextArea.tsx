import cn from 'classnames'
import { ChangeEvent } from 'react'

import styles from './TextArea.module.scss'

export const DEFAULT_ROWS = 3

export interface TextAreaProps {
  text?: string
  placeholder?: string
  rows?: number
  isReadOnly?: boolean
  onChange?: (value: string) => void
  className?: string
}

type Comp = (props: TextAreaProps) => JSX.Element

const TextArea: Comp = (props) => {
  const { text, placeholder, rows = DEFAULT_ROWS, isReadOnly = false, onChange, className } = props

  return (
    <textarea
      data-testid="textarea"
      className={cn(styles['textArea'], className)}
      value={text}
      placeholder={placeholder}
      readOnly={isReadOnly}
      rows={rows}
      maxLength={255}
      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => onChange?.(e.currentTarget.value)}
    ></textarea>
  )
}

export default TextArea
