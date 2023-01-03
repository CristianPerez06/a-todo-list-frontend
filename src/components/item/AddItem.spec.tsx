import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import AddItem from './AddItem'

describe('When component IS DISPLAYED', () => {
  it('should SHOW an INPUT and a CLEAR BUTTON', () => {
    const mockedFn = jest.fn()

    render(<AddItem totalTasksCount={1} onSave={mockedFn} />)

    const container = screen.getByTestId('add-item')
    const textarea = within(container).getByTestId('textarea')
    const button = within(container).getByTestId('button')

    expect(textarea).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  describe('when input IS EMPTY', () => {
    it('should SHOW the ADD BUTTON as DISABLED', () => {
      const mockedFn = jest.fn()

      render(<AddItem totalTasksCount={1} onSave={mockedFn} />)

      const container = screen.getByTestId('add-item')
      const button = within(container).getByTestId('button')

      expect(button).toHaveAttribute('disabled')
    })
  })

  describe('when input IS NOT EMPTY', () => {
    it('should SHOW the ADD BUTTON as ENABLED', async () => {
      const NEW_TEXT = 'a'
      const mockedFn = jest.fn()

      render(<AddItem totalTasksCount={1} onSave={mockedFn} />)

      const container = screen.getByTestId('add-item')
      const textarea = within(container).getByTestId('textarea')

      await userEvent.type(textarea, NEW_TEXT)

      const button = within(container).getByTestId('button')

      expect(button).not.toHaveAttribute('disabled')
    })

    describe('when ADD BUTTON is CLICKED', () => {
      it('should ADD a new item', async () => {
        const LIST = []
        const NEW_TEXT = 'a'
        const mockedFn = jest.fn()

        render(<AddItem totalTasksCount={LIST.length} onSave={mockedFn} />)

        const container = screen.getByTestId('add-item')

        const textarea = within(container).getByTestId('textarea')
        await userEvent.type(textarea, NEW_TEXT)

        const button = within(container).getByTestId('button')
        await fireEvent.click(button)

        expect(mockedFn).toHaveBeenCalledTimes(1)
        expect(mockedFn).toHaveBeenCalledWith({ text: NEW_TEXT })
      })
    })
  })
})
