import styles from './app.module.scss'
import Main from './components/Main'
import AppContextProvider from './context/AppContext'

type Comp = () => JSX.Element

const App: Comp = () => {
  return (
    <div className={styles['app']}>
      <AppContextProvider>
        <Main />
      </AppContextProvider>
    </div>
  )
}

export default App
