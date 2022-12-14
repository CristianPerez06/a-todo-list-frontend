import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Input from './Input'

describe('When Input is EMPTY', () => {
  it('input should NOT SHOW a value', () => {
    render(<Input />)

    const input = screen.getByTestId('input')

    expect(input).not.toHaveValue()
  })

  describe('when NO PLACEHOLDER IS DEFINED', () => {
    it('input should NOT SHOW a placeholder', () => {
      render(<Input />)

      const input = screen.getByTestId('input')

      expect(input).not.toHaveAttribute('placeholder')
    })
  })

  describe('when a PLACEHOLDER IS DEFINED', () => {
    it('input should SHOW a placeholder', () => {
      const PLACEHOLDER = 'a placeholder'

      render(<Input placeholder={PLACEHOLDER} />)

      const element = screen.getByTestId('input')

      expect(element).toHaveAttribute('placeholder', PLACEHOLDER)
    })
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('input should SHOW the NEW TEXT', async () => {
      const NEW_TEXT = 'a'
      const mockedOnChange = jest.fn()

      render(<Input onChange={mockedOnChange} />)

      const input = screen.getByTestId('input')

      await userEvent.type(input, NEW_TEXT)

      expect(input).toHaveValue(NEW_TEXT)
      expect(mockedOnChange).toHaveBeenCalledTimes(1)
    })
  })
})

describe('When Input is NOT EMPTY', () => {
  it('input should SHOW a value', () => {
    const TEXT = 'a value'

    render(<Input text={TEXT} />)

    const element = screen.getByTestId('input')

    expect(element).toHaveValue(TEXT)
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('input should SHOW the NEW TEXT', async () => {
      const PREV_TEXT = 'a'
      const NEW_TEXT = 'b'
      const mockedOnChange = jest.fn()

      render(<Input text={PREV_TEXT} onChange={mockedOnChange} />)

      const element = screen.getByTestId('input')

      await userEvent.type(element, NEW_TEXT)

      expect(mockedOnChange).toHaveBeenCalledTimes(1)
      expect(mockedOnChange).toHaveBeenCalledWith(PREV_TEXT + NEW_TEXT)
    })
  })
})

describe('When Input is DISABLED', () => {
  it('input should NOT BE USABLE', () => {
    render(<Input isReadOnly />)

    const element = screen.getByTestId('input')

    expect(element).toHaveAttribute('readonly')
  })
})
