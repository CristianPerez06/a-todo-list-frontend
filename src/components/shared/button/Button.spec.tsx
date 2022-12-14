import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'

import Button from './Button'

const CONTENT = 'Click me!'

describe('When button IS ENABLED', () => {
  it('button should BE CLICKEABLE', () => {
    const mockOnClick = jest.fn()

    render(<Button content={CONTENT} onClick={mockOnClick} />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    expect(mockOnClick).toHaveBeenCalled()
    expect(button.textContent).toBe(CONTENT)
  })
})

describe('When button IS DISABLED', () => {
  it('button should NOT BE CLICKEABLE', () => {
    const mockOnClick = jest.fn()

    render(<Button content={CONTENT} onClick={mockOnClick} isDisabled />)

    const button = screen.getByTestId('button')
    fireEvent.click(button)

    expect(mockOnClick).not.toHaveBeenCalled()
    expect(button.textContent).toBe(CONTENT)
  })
})
