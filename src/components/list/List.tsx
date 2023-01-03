import { useCallback, useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd'
import { ACTION_TYPES } from '../../context/AppContext'
import useAppContext from '../../hooks/useAppContext'
import { Task } from '../../types/types'
import { showErrorMessage } from '../alert/Alert'
import EditItem from '../item/EditItem'
import Loading from '../loading/Loading'

import styles from './List.module.scss'
import { prepareTasksLists } from './utilities'

export interface ListProps {
  items: Task[]
}

type Comp = (props: ListProps) => JSX.Element

const List: Comp = (props) => {
  const { items } = props

  const [tasks, setTasks] = useState<Task[]>([])

  const { dispatch, state: appState } = useAppContext()

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) return

      dispatch({ type: ACTION_TYPES.LOADING })

      const reorderedTasksList = Array.from(tasks)
      const [reorderedItem] = reorderedTasksList.splice(result.source.index, 1)
      reorderedTasksList.splice(result.destination.index, 0, reorderedItem)

      const { tasksForUI, tasksForDB } = prepareTasksLists(tasks, reorderedTasksList)

      fetch(`${process.env.REACT_APP_API_URL}/updateTasks`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ list: tasksForDB }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            throw new Error()
          }
          dispatch({
            type: ACTION_TYPES.REFRESH_TASKS,
            tasksList: tasksForUI,
          })
          dispatch({ type: ACTION_TYPES.NOT_LOADING })
        })
        .catch(() => {
          showErrorMessage()
          dispatch({ type: ACTION_TYPES.NOT_LOADING })
        })
    },
    [tasks, dispatch]
  )

  const handleOnEdit = useCallback((task: Task) => {
    dispatch({ type: ACTION_TYPES.LOADING })

    fetch(`${process.env.REACT_APP_API_URL}/updateTask`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(task),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error()
        }
        dispatch({ type: ACTION_TYPES.UPDATE_TASK, task: res })
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
      .catch(() => {
        showErrorMessage()
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
  }, [])

  const handleOnDelete = useCallback((task: Task) => {
    dispatch({ type: ACTION_TYPES.LOADING })

    fetch(`${process.env.REACT_APP_API_URL}/deleteTask`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: task.id }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          throw new Error()
        }
        dispatch({ type: ACTION_TYPES.DELETE_TASK, task: { id: task.id, text: '' } })
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
      .catch(() => {
        showErrorMessage()
        dispatch({ type: ACTION_TYPES.NOT_LOADING })
      })
  }, [])

  useEffect(() => {
    setTasks(items)
  }, [items])

  return (
    <div className={styles['container']}>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="tasks">
          {(provided: DroppableProvided) => (
            <ul className={styles['listContainer']} {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => {
                return (
                  <Draggable key={task.id} draggableId={(task.id as number).toString()} index={index}>
                    {(provided: DraggableProvided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={styles['listItem']}
                      >
                        <EditItem item={task} onSave={handleOnEdit} onDelete={handleOnDelete} />
                      </li>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      {appState.isLoading && <Loading />}
    </div>
  )
}

export default List
