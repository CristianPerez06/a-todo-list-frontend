/* eslint-disable no-case-declarations */
import { createContext, Dispatch, useReducer } from 'react'
import { Task } from '../types/types'
import { addTask, deleteTask, updateTask } from './reducerUtils'

export enum ACTION_TYPES {
  ADD_TASK = 'ADD_TASK',
  UPDATE_TASK = 'UPDATE_TASK',
  REFRESH_TASKS = 'REFRESH_TASKS',
  DELETE_TASK = 'DELETE_TASK',
  LOADING = 'LOADING',
  NOT_LOADING = 'NOT_LOADING',
}

interface IAddTask {
  type: ACTION_TYPES.ADD_TASK
  task: Task
}

interface IUpdateTask {
  type: ACTION_TYPES.UPDATE_TASK
  task: Task
}

interface IDeleteTask {
  type: ACTION_TYPES.DELETE_TASK
  task: Task
}

interface IRefreshTasks {
  type: ACTION_TYPES.REFRESH_TASKS
  tasksList: Task[]
}

interface ILoading {
  type: ACTION_TYPES.LOADING
}

interface INotLoading {
  type: ACTION_TYPES.NOT_LOADING
}
export type Actions = IAddTask | IUpdateTask | IDeleteTask | IRefreshTasks | ILoading | INotLoading

export interface IState {
  isLoading: boolean
  tasksList: Task[]
}

interface IContextProps {
  state: IState
  dispatch: Dispatch<Actions>
}

export const initialState: IState = {
  isLoading: false,
  tasksList: [],
}

export const AppContext = createContext<IContextProps>({
  state: initialState,
  dispatch: () => null,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AppContextProvider = (props: any) => {
  const reducer = (state: IState, action: Actions) => {
    switch (action.type) {
      case ACTION_TYPES.ADD_TASK: {
        return {
          ...state,
          tasksList: addTask(action.task, state.tasksList),
        }
      }
      case ACTION_TYPES.UPDATE_TASK: {
        return {
          ...state,
          tasksList: updateTask(action.task, state.tasksList),
        }
      }

      case ACTION_TYPES.REFRESH_TASKS: {
        return {
          ...state,
          tasksList: action.tasksList,
        }
      }
      case ACTION_TYPES.DELETE_TASK: {
        return {
          ...state,
          tasksList: deleteTask(action.task, state.tasksList),
        }
      }
      case ACTION_TYPES.LOADING: {
        return {
          ...state,
          isLoading: true,
        }
      }
      case ACTION_TYPES.NOT_LOADING: {
        return {
          ...state,
          isLoading: false,
        }
      }
      default:
        return {
          ...state,
        }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const value = { state, dispatch }

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export default AppContextProvider
