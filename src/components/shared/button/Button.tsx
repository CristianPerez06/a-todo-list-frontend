import cn from 'classnames'

import styles from './Button.module.scss'

export interface TextAreaProps {
  content: string | JSX.Element
  isDisabled?: boolean
  onClick: () => void
  className?: string
}

type Comp = (props: TextAreaProps) => JSX.Element

const Button: Comp = (props) => {
  const { content, isDisabled = false, onClick, className } = props

  return (
    <button data-testid="button" className={cn(styles['button'], className)} disabled={isDisabled} onClick={onClick}>
      {content}
    </button>
  )
}

export default Button
