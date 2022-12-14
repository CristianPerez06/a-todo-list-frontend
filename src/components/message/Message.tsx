import styles from './Message.module.scss'

export interface MessageProps {
  text: string
}

type Comp = (props: MessageProps) => JSX.Element

const Message: Comp = (props) => {
  const { text } = props

  return (
    <div className={styles['container']} data-testid={'message'}>
      <span className={styles['text']} data-testid={'text'}>
        {text}
      </span>
    </div>
  )
}

export default Message
