import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextArea, { DEFAULT_ROWS } from './TextArea'

describe('When ROWS is defined', () => {
  it('textArea SHOULD BE SET to use the CUSTOM ROWS QUANTITY', () => {
    const CUSTOM_ROWS = 2

    render(<TextArea rows={CUSTOM_ROWS} />)

    const textarea = screen.getByTestId('textarea')

    expect(textarea).toHaveAttribute('rows', CUSTOM_ROWS.toString())
  })

  describe('When ROWS IS NOT defined', () => {
    it('textArea SHOULD BE SET to use the DEFAULT ROWS QUANTITY', () => {
      render(<TextArea />)

      const textarea = screen.getByTestId('textarea')

      expect(textarea).toHaveAttribute('rows', DEFAULT_ROWS.toString())
    })
  })

  describe('when NO PLACEHOLDER IS DEFINED', () => {
    it('textArea should NOT SHOW a placeholder', () => {
      render(<TextArea />)

      const textarea = screen.getByTestId('textarea')

      expect(textarea).not.toHaveAttribute('placeholder')
    })
  })

  describe('when a PLACEHOLDER IS DEFINED', () => {
    it('textArea should SHOW a placeholder', () => {
      const PLACEHOLDER = 'a placeholder'

      render(<TextArea placeholder={PLACEHOLDER} />)

      const textarea = screen.getByTestId('textarea')

      expect(textarea).toHaveAttribute('placeholder', PLACEHOLDER)
    })
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('textArea should SHOW the NEW TEXT', async () => {
      const NEW_TEXT = 'a'
      const mockedOnChange = jest.fn()

      render(<TextArea onChange={mockedOnChange} />)

      const textarea = screen.getByTestId('textarea')

      await userEvent.type(textarea, NEW_TEXT)

      expect(textarea).toHaveValue(NEW_TEXT)
      expect(mockedOnChange).toHaveBeenCalledTimes(1)
    })
  })
})

describe('When TextArea is EMPTY', () => {
  it('textArea should NOT SHOW a value', () => {
    render(<TextArea />)

    const textarea = screen.getByTestId('textarea')

    expect(textarea).not.toHaveValue()
  })

  describe('when NO PLACEHOLDER IS DEFINED', () => {
    it('textArea should NOT SHOW a placeholder', () => {
      render(<TextArea />)

      const textarea = screen.getByTestId('textarea')

      expect(textarea).not.toHaveAttribute('placeholder')
    })
  })

  describe('when a PLACEHOLDER IS DEFINED', () => {
    it('textArea should SHOW a placeholder', () => {
      const PLACEHOLDER = 'a placeholder'

      render(<TextArea placeholder={PLACEHOLDER} />)

      const textarea = screen.getByTestId('textarea')

      expect(textarea).toHaveAttribute('placeholder', PLACEHOLDER)
    })
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('textArea should SHOW the NEW TEXT', async () => {
      const NEW_TEXT = 'a'
      const mockedOnChange = jest.fn()

      render(<TextArea onChange={mockedOnChange} />)

      const textarea = screen.getByTestId('textarea')

      await userEvent.type(textarea, NEW_TEXT)

      expect(textarea).toHaveValue(NEW_TEXT)
      expect(mockedOnChange).toHaveBeenCalledTimes(1)
    })
  })
})

describe('When TextArea is NOT EMPTY', () => {
  it('textArea should SHOW a value', () => {
    const TEXT = 'a value'

    render(<TextArea text={TEXT} />)

    const textarea = screen.getByTestId('textarea')

    expect(textarea).toHaveValue(TEXT)
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('textArea should SHOW the NEW TEXT', async () => {
      const PREV_TEXT = 'a'
      const NEW_TEXT = 'b'
      const mockedOnChange = jest.fn()

      render(<TextArea text={PREV_TEXT} onChange={mockedOnChange} />)

      const textarea = screen.getByTestId('textarea')

      await userEvent.type(textarea, NEW_TEXT)

      expect(mockedOnChange).toHaveBeenCalledTimes(1)
      expect(mockedOnChange).toHaveBeenCalledWith(PREV_TEXT + NEW_TEXT)
    })
  })
})

describe('When TextArea is READONLY', () => {
  it('textArea should NOT BE USABLE', () => {
    render(<TextArea isReadOnly />)

    const textarea = screen.getByTestId('textarea')

    expect(textarea).toHaveAttribute('readonly')
  })

  describe('when a NEW TEXT IS TYPED IN', () => {
    it('textArea should SHOW the NEW TEXT', async () => {
      const PREV_TEXT = 'a'
      const NEW_TEXT = 'b'
      const mockedOnChange = jest.fn()

      render(<TextArea text={PREV_TEXT} onChange={mockedOnChange} />)

      const textarea = screen.getByTestId('textarea')

      await userEvent.type(textarea, NEW_TEXT)

      expect(mockedOnChange).toHaveBeenCalledTimes(1)
      expect(mockedOnChange).toHaveBeenCalledWith(PREV_TEXT + NEW_TEXT)
    })
  })
})
