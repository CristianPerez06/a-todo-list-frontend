import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'

import EditItem from './EditItem'

const ITEM_TEXT = 'a text'
const ITEM = {
  id: 1,
  text: ITEM_TEXT,
  position: 1,
}

describe('When component IS NOT IN EDIT MODE', () => {
  it('should SHOW the EDIT and DELETE BUTTONS', () => {
    render(<EditItem item={ITEM} />)

    const container = screen.getByTestId('edit-item')
    const detailSection = within(container).getByTestId('detail-section')
    const editButton = within(detailSection).getByTestId('edit-button')
    const deleteButton = within(detailSection).getByTestId('delete-button')

    expect(editButton).toBeInTheDocument()
    expect(deleteButton).toBeInTheDocument()
  })

  describe('when EDIT BUTTON IS CLICKED', () => {
    it('should SHOW the EDIT SECTION', async () => {
      render(<EditItem item={ITEM} />)

      const container = screen.getByTestId('edit-item')
      const detailSection = within(container).getByTestId('detail-section')
      const editButtonContainer = within(detailSection).getByTestId('edit-button')
      const editButton = within(editButtonContainer).getByRole('button')

      await fireEvent.click(editButton)

      await waitFor(() => {
        expect(detailSection).not.toBeInTheDocument()

        const editSection = within(container).getByTestId('edit-section')
        expect(editSection).toBeInTheDocument()
      })
    })
  })

  describe('when DELETE BUTTON IS CLICKED', () => {
    it('should CALL the onDelete method', async () => {
      const mockedOnDelete = jest.fn()

      render(<EditItem item={ITEM} onDelete={mockedOnDelete} />)

      const container = screen.getByTestId('edit-item')
      const detailSection = within(container).getByTestId('detail-section')
      const deleteButtonContainer = within(detailSection).getByTestId('delete-button')
      const deleteButton = within(deleteButtonContainer).getByRole('button')

      await fireEvent.click(deleteButton)

      expect(mockedOnDelete).toHaveBeenCalledTimes(1)
      expect(mockedOnDelete).toHaveBeenCalledWith(ITEM)
    })
  })
})

describe('When component IS IN EDIT MODE', () => {
  it('should SHOW the EDIT and DELETE BUTTONS', () => {
    render(<EditItem item={ITEM} isEditMode />)

    const container = screen.getByTestId('edit-item')
    const editSection = within(container).getByTestId('edit-section')
    const saveButton = within(editSection).getByTestId('save-button')
    const cancelButton = within(editSection).getByTestId('cancel-button')

    expect(saveButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  describe('when CANCEL BUTTON IS CLICKED', () => {
    it('should SHOW the DETAIL SECTION', async () => {
      const mockedOnSave = jest.fn()

      render(<EditItem item={ITEM} isEditMode onSave={mockedOnSave} />)

      const container = screen.getByTestId('edit-item')
      const editSection = within(container).getByTestId('edit-section')
      const cancelButtonContainer = within(editSection).getByTestId('cancel-button')
      const cancelButton = within(cancelButtonContainer).getByRole('button')

      await fireEvent.click(cancelButton)

      await waitFor(() => {
        expect(editSection).not.toBeInTheDocument()

        const detailSection = within(container).getByTestId('detail-section')
        expect(detailSection).toBeInTheDocument()
      })
    })
  })
})
