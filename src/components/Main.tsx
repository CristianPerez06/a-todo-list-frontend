import { useCallback, useEffect, useState } from 'react'
import { ACTION_TYPES } from '../context/AppContext'
import useAppContext from '../hooks/useAppContext'
import { Task } from '../types/types'
import 'react-toastify/dist/ReactToastify.css'
import AddItem from './item/AddItem'
import Alert, { showErrorMessage } from './alert/Alert'
import Filter from './filter/Filter'
import Header from './header/Header'

import styles from './Main.module.scss'
import List from './list/List'
import Message from './message/Message'
import Loading from './loading/Loading'

type Comp = () => JSX.Element

const Main: Comp = () => {
  const { state: appState, dispatch } = useAppContext()

  const [filteredList, setFilteredList] = useState<Task[] | undefined>(undefined)

  const handleOnSave = (newTask: Task) => {
    dispatch({ type: ACTION_TYPES.LOADING })
    fetch(`${process.env.REACT_APP_API_URL}/addTask`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then((insertedTask) => {
        // eslint-disable-next-line no-debugger
        debugger
        dispatch({ type: ACTION_TYPES.ADD_TASK, task: insertedTask })
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
      .catch(() => {
        showErrorMessage()
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
  }

  const handleFiltering = useCallback(
    (list: Task[] | undefined) => {
      setFilteredList(list === undefined ? appState.tasksList : list)
    },
    [appState.tasksList]
  )

  useEffect(() => {
    dispatch({ type: ACTION_TYPES.LOADING })

    fetch(`${process.env.REACT_APP_API_URL}/getTasks`)
      .then((res) => res.json())
      .then((list) => {
        dispatch({ type: ACTION_TYPES.REFRESH_TASKS, tasksList: list })
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
      .catch(() => {
        showErrorMessage()
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
  }, [dispatch])

  return (
    <div className={styles['container']}>
      <Header
        content={
          <div className={styles['headerContent']}>
            <div className={styles['leftContent']}>
              <h1 className={styles['title']}>a todo list</h1>
            </div>

            <div className={styles['middleContent']}>
              <span>|</span>
            </div>

            <Filter list={appState.tasksList} isDisabled={appState.isLoading} onFilteredList={handleFiltering} />
          </div>
        }
      />

      <div className={styles['bodyContainer']}>
        <AddItem onSave={handleOnSave} totalTasksCount={appState.tasksList.length} isDisabled={appState.isLoading} />
        <div className={styles['divider']}>
          <div className={styles['line']}></div>
        </div>
        <div className={styles['listContainer']}>
          <List items={filteredList !== undefined ? filteredList : appState.tasksList} />
          {!appState.isLoading && appState.tasksList.length === 0 && <Message text={`Add your first task`} />}
          {appState.isLoading && <Loading />}
        </div>

        <Alert />
      </div>
    </div>
  )
}

export default Main
