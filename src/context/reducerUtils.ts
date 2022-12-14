import { Task } from '../types/types'

export const addTask = (newTask: Task, tasksList: Task[]) => {
  return [newTask, ...tasksList]
}

export const updateTask = (updatedTask: Task, tasksList: Task[]) => {
  const taskIndex = tasksList.findIndex((x) => x.id === updatedTask.id)
  const updatedTasksList = [...tasksList]
  updatedTasksList[taskIndex].text = updatedTask?.text as string
  return updatedTasksList
}

export const deleteTask = (task: Task, tasksList: Task[]) => {
  const updatedTasksList = tasksList.filter((x) => x.id !== task.id)
  return updatedTasksList
}
