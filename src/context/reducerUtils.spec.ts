import { addTask, updateTask, deleteTask } from './reducerUtils'
import { Task } from '../types/types'

const ITEM = {
  id: 2,
  text: 'different item',
  position: 2,
}

const LIST: Task[] = [
  { id: 1, text: '1st item', position: 1 },
  { id: 3, text: '3rd item', position: 3 },
]

describe('When TASK is ADDED', () => {
  it('should ADD the TASK to the LIST', () => {
    const res = addTask(ITEM, LIST)

    expect(res.length).toBe(3)
    expect(res.findIndex((x) => x.id === ITEM.id)).not.toBe(-1)
  })
})

describe('When TASK is UPDATED', () => {
  it('should UPDATE the TASK in the LIST', () => {
    const updatedItem = {
      id: ITEM.id,
      text: 'updated text',
      position: ITEM.position,
    }

    const res = updateTask(updatedItem, [...LIST, ITEM])

    expect(res.length).toBe(3)
    expect(res.findIndex((x) => x.text === updatedItem.text)).not.toBe(-1)
  })
})

describe('When TASK is DELETED', () => {
  it('should DELETE the TASK from the LIST', () => {
    const res = deleteTask(ITEM, [...LIST, ITEM])

    expect(res.length).toBe(2)
    expect(res.findIndex((x) => x.id === ITEM.id)).toBe(-1)
  })
})
