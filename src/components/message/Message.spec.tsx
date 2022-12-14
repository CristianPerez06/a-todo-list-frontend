import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, within } from '@testing-library/react'

import Message from './Message'

describe('When component IS DISPLAYED', () => {
  it('should SHOW a TEXT content', () => {
    const TEXT = 'a text message'

    render(<Message text={TEXT} />)

    const container = screen.getByTestId('message')
    const text = within(container).getByTestId('text')

    expect(text).toHaveTextContent(TEXT)
  })
})
