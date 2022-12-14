import { useEffect, useState } from 'react'
import { Task } from '../../types/types'
import { CheckCircleIcon, XCircleIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'

import styles from './EditItem.module.scss'
import Button from '../shared/button/Button'
import TextArea from '../shared/textarea/TextArea'

export interface EditItemProps {
  item: Task
  isDisabled?: boolean
  isEditMode?: boolean
  onSave?: (task: Task) => void
  onDelete?: (task: Task) => void
}

type Comp = (props: EditItemProps) => JSX.Element

const EditItem: Comp = (props) => {
  const { item, isDisabled = false, isEditMode = false, onSave, onDelete } = props

  const [updatedText, setUpdatedText] = useState(item.text)
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancelClick = () => {
    setUpdatedText(item.text)
    setIsEditing(false)
  }

  const handleOnChange = (value: string) => {
    setUpdatedText(value)
  }

  const handleSaveClick = (task: Task) => {
    onSave?.(task)
  }

  const handleDeleteClick = (task: Task) => {
    onDelete?.(task)
  }

  useEffect(() => {
    setIsEditing(isEditMode || false)
  }, [item.text, isEditMode])

  return (
    <div className={styles['container']} data-testid={'edit-item'}>
      {!isEditing && (
        <div className={styles['detail']} data-testid={'detail-section'}>
          <span className={styles['text']}>{item.text}</span>
          <div className={styles['buttonsContainer']}>
            <div data-testid={'edit-button'}>
              <Button
                content={<PencilSquareIcon className={styles['buttonIcon']} />}
                isDisabled={isDisabled}
                onClick={handleEditClick}
                className={styles['buttonEdit']}
              />
            </div>
            <div data-testid={'delete-button'}>
              <Button
                data-testid={'delete-button'}
                content={<TrashIcon className={styles['buttonIcon']} />}
                isDisabled={isDisabled}
                onClick={() => handleDeleteClick(item)}
                className={styles['buttonDelete']}
              />
            </div>
          </div>
        </div>
      )}
      {isEditing && (
        <div className={styles['edit']} data-testid={'edit-section'}>
          <TextArea text={updatedText} placeholder={'Task info ...'} rows={3} onChange={handleOnChange} />
          <div className={styles['editButtonsContainer']}>
            <div data-testid={'save-button'}>
              <Button
                content={<CheckCircleIcon className={styles['editButtonIcon']} />}
                onClick={() => {
                  handleSaveClick({
                    id: item.id,
                    text: updatedText,
                    position: item.position,
                  })
                }}
                isDisabled={updatedText === item.text || !updatedText}
                className={styles['editButtonSave']}
              />
            </div>

            <div data-testid={'cancel-button'}>
              <Button
                content={<XCircleIcon className={styles['editButtonIcon']} />}
                onClick={handleCancelClick}
                className={styles['editButtonCancel']}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditItem
