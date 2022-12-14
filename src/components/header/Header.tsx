import styles from './Header.module.scss'

export interface HeaderProps {
  content?: JSX.Element
}

type Comp = (props: HeaderProps) => JSX.Element

export const HeaderContainer: Comp = (props) => {
  const { content } = props

  return (
    <header className={styles['header']}>
      <div className={styles['innerContainer']}>{content}</div>
    </header>
  )
}

export default HeaderContainer
