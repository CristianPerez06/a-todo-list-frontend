import Spinner from './spinner/Spinner'
import styles from './Loading.module.scss'

type Loading = () => JSX.Element

export const Loading = () => {
  return (
    <>
      <div className={styles['background']}></div>
      <div className={styles['spinner']}>
        <Spinner />
      </div>
    </>
  )
}

export default Loading
