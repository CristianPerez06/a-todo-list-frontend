import { Task } from '../../types/types'

interface CuratedTasksLists {
  // Task items used in UI
  tasksForUI: Task[]
  // Task items ready for DB update
  tasksForDB: Task[]
}

export const prepareTasksLists = (originalTasksList: Task[], reorderedTasksList: Task[]): CuratedTasksLists => {
  const toUpdateTasks: Task[] = []
  const updatedTasks = reorderedTasksList.map((reorderedTask, index) => {
    const originalTask = originalTasksList[index]

    if (reorderedTask.id === originalTask.id) {
      // Task was not updated - Return original task
      return originalTask
    } else {
      // Task was updated - Return updated task
      const previousTask = reorderedTasksList[index + 1]

      const updatedTask = {
        id: reorderedTask.id,
        text: reorderedTask.text,
        previous: previousTask?.id,
      }

      toUpdateTasks.push(updatedTask)

      return updatedTask
    }
  })

  // Get tasks related to latest update.
  // Example:
  // Original list: 1 - 2 - 3
  // Updated list: 1 - 3 - 2
  // Then:
  // * Items 3 and 2 are the ones that changed
  // * Item 1 also needs to be updated. Its PreviousTaskId should point to 3 now (instead of 2)
  const updatedTaskIds = toUpdateTasks.map((task) => task.id)
  const toUpdateRelatedTasks = reorderedTasksList
    .filter(({ previous }) => updatedTaskIds.includes(previous))
    .filter(({ id }) => !updatedTaskIds.includes(id))
  toUpdateRelatedTasks.forEach((taskRelated) => {
    const newPreviousTaskIndex = reorderedTasksList.findIndex((task) => task.id === taskRelated.id)
    taskRelated.previous = reorderedTasksList[newPreviousTaskIndex + 1].id
  })

  return {
    tasksForUI: updatedTasks,
    tasksForDB: [...toUpdateTasks, ...toUpdateRelatedTasks],
  }
}
