import styles from './Spinner.module.scss'

export enum Type {
  FULL = 'full',
  CONTENT = 'content',
}

interface SpinnerProps {
  size?: number
  className?: string
}

type Comp = (props: SpinnerProps) => JSX.Element

export const Spinner: Comp = (props) => {
  const { size = 75 } = props

  const strokeWidth = 6
  const r = 30

  return (
    <div className={styles['container']}>
      <svg
        className={styles['spinner']}
        width={size}
        height={size}
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles['path']}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          cx="33"
          cy="33"
          r={r}
        ></circle>
      </svg>
    </div>
  )
}

export default Spinner
