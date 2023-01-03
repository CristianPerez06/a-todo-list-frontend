import { useCallback, useEffect, useState } from 'react'
import { Task } from '../../types/types'
import { XCircleIcon } from '@heroicons/react/24/outline'

import styles from './Filter.module.scss'
import Input from '../shared/input/Input'
import Button from '../shared/button/Button'

export interface FilterProps {
  list: Task[]
  isDisabled?: boolean
  onFilteredList: (filteredList: Task[] | undefined) => void
}

type Comp = (props: FilterProps) => JSX.Element

const Filter: Comp = (props) => {
  const { list, isDisabled = false, onFilteredList } = props
  const [searchText, setSearchText] = useState('')

  const getFilteredItems = (text: string, itemsList: Task[]) => {
    const filteredOptions = itemsList.filter((x) => x.text.includes(text))
    return filteredOptions
  }

  const handleOnChange = useCallback(
    (value: string, itemsList: Task[]) => {
      const filteredItems = getFilteredItems(value, itemsList)
      setSearchText(value)
      onFilteredList?.(filteredItems)
    },
    [list]
  )

  const handleOnClear = useCallback(() => {
    setSearchText('')
    onFilteredList(undefined)
  }, [])

  useEffect(() => {
    const filteredOptions = getFilteredItems(searchText, list)
    onFilteredList(filteredOptions)
  }, [searchText, list, onFilteredList])

  return (
    <div className={styles['container']} data-testid={'filter'}>
      <div className={styles['content']} data-testid={'content'}>
        <Input
          text={searchText}
          placeholder={'Filter by ...'}
          isReadOnly={isDisabled}
          onChange={(value: string) => {
            handleOnChange(value, list)
          }}
        />
        <Button
          data-testid={'content'}
          content={<XCircleIcon className={styles['buttonIcon']} />}
          onClick={() => {
            handleOnClear()
          }}
          isDisabled={!searchText}
          className={styles['buttonFilter']}
        />
      </div>
    </div>
  )
}

export default Filter
