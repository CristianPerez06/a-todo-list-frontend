import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Task } from '../../types/types'

import Filter from './Filter'

const ITEM: Task = {
  id: 2,
  text: 'different item',
  previous: 2,
}

const LIST: Task[] = [{ id: 1, text: '1st item', previous: 1 }, ITEM, { id: 3, text: '3rd item', previous: 3 }]

describe('When component IS DISPLAYED', () => {
  it('should SHOW an INPUT and a CLEAR BUTTON', () => {
    const mockedFn = jest.fn()

    render(<Filter list={LIST} onFilteredList={mockedFn} />)

    const container = screen.getByTestId('filter')
    const input = within(container).getByTestId('input')
    const button = within(container).getByTestId('button')

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('should show the CLEAR BUTTON as DISABLED', async () => {
    const mockedFn = jest.fn()

    render(<Filter list={LIST} onFilteredList={mockedFn} />)

    const container = screen.getByTestId('filter')
    const button = within(container).getByTestId('button')

    expect(button).toHaveAttribute('disabled')
  })

  describe('When input RECEIVES A VALUE', () => {
    it('should FILTER the RESULTS', async () => {
      const TEXT = 'dif'

      const mockedFn = jest.fn()

      render(<Filter list={LIST} onFilteredList={mockedFn} />)

      const container = screen.getByTestId('filter')
      const input = within(container).getByTestId('input')

      await userEvent.type(input, TEXT)

      expect(mockedFn).toHaveBeenCalledWith([ITEM])
    })

    it('should ENABLE the CLEAR button', async () => {
      const TEXT = 'a'

      const mockedFn = jest.fn()

      render(<Filter list={LIST} onFilteredList={mockedFn} />)

      const container = screen.getByTestId('filter')
      const input = within(container).getByTestId('input')

      await userEvent.type(input, TEXT)
      const button = within(container).getByTestId('button')

      expect(button).not.toHaveAttribute('disabled')
    })

    describe('when CLEAR BUTTON IS CLICKED', () => {
      it('should CLEAR the INPUT', async () => {
        const TEXT = 'a'

        const mockedFn = jest.fn()

        render(<Filter list={LIST} onFilteredList={mockedFn} />)

        const container = screen.getByTestId('filter')

        const input = within(container).getByTestId('input')
        await userEvent.type(input, TEXT)

        const button = within(container).getByTestId('button')
        await fireEvent.click(button)

        expect(input).toHaveValue('')
      })
    })
  })
})
