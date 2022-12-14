import { useEffect, useState } from 'react'
import { Task } from '../../types/types'
import styles from './AddItem.module.scss'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Button from '../shared/button/Button'
import TextArea from '../shared/textarea/TextArea'

export interface AddItemProps {
  onSave?: (newTask: Task) => void
  isDisabled?: boolean
  totalTasksCount: number
}

type Comp = (props: AddItemProps) => JSX.Element

const AddItem: Comp = (props) => {
  const { onSave, isDisabled = false, totalTasksCount } = props

  const [newText, setNewText] = useState('')

  const handleOnChange = (value: string) => {
    setNewText(value)
  }

  const handleSaveClick = (text: string, totalCount: number) => {
    const newTask = {
      id: 0,
      text: text,
      position: totalCount + 1,
    }

    onSave?.(newTask)
  }

  useEffect(() => {
    setNewText('')
  }, [totalTasksCount])

  return (
    <div className={styles['container']} data-testid={'add-item'}>
      <div className={styles['add']}>
        <TextArea
          data-testid={'textarea'}
          text={newText}
          placeholder={'Task info ...'}
          isReadOnly={isDisabled}
          rows={3}
          onChange={handleOnChange}
          className={styles['textArea']}
        />
        <div className={styles['buttonsContainer']}>
          <Button
            data-testid={'button'}
            content={<PlusCircleIcon className={styles['buttonIcon']} />}
            onClick={() => {
              handleSaveClick(newText, totalTasksCount)
            }}
            isDisabled={!newText || isDisabled}
            className={styles['buttonAdd']}
          />
        </div>
      </div>
    </div>
  )
}

export default AddItem
