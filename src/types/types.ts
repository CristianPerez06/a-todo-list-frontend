export type Task = {
  // Task identified
  id?: number
  // Task description
  text: string
  // Task identified of previous task (used for linked list)
  previous?: number
}
