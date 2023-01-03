import { Task } from '../../types/types'
import { prepareTasksLists } from './utilities'

const ITEM_D: Task = {
  id: 4,
  text: 'Item D',
  previous: 3,
}

const ITEM_C: Task = {
  id: 3,
  text: 'Item C',
  previous: 2,
}

const ITEM_B: Task = {
  id: 2,
  text: 'Item B',
  previous: 1,
}

const ITEM_A: Task = {
  id: 1,
  text: 'Item A',
  previous: undefined,
}

describe('When TASK LIST is UPDATED', () => {
  it('should PREPARE the lists for UI and DB', () => {
    const ORIGINAL_LIST = [ITEM_D, ITEM_C, ITEM_B, ITEM_A]

    const TASKS_TO_UPDATE = [ITEM_C, ITEM_A, ITEM_B]
    const REORDERED_LIST = [ITEM_D, ...TASKS_TO_UPDATE]

    const { tasksForUI, tasksForDB } = prepareTasksLists(ORIGINAL_LIST, REORDERED_LIST)

    tasksForUI.forEach((task, index) => {
      expect(task.toString()).toBe(REORDERED_LIST[index].toString())
    })

    tasksForDB.forEach((task) => {
      const taskForUpdate = TASKS_TO_UPDATE.find((x) => x.id === task.id)
      expect(taskForUpdate).toBeTruthy()
    })
  })
})
