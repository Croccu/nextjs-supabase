import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { describe, it, expect } from 'vitest'

// simple mock Todo component for testing
function Todo({ title, completed }: { title: string; completed: boolean }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{completed ? 'Done' : 'Pending'}</p>
    </div>
  )
}

describe('Todo component', () => {
  it('renders todo title and status', () => {
    render(<Todo title="Buy milk" completed={false} />)
    expect(screen.getByText('Buy milk')).toBeInTheDocument()
    expect(screen.getByText('Pending')).toBeInTheDocument()
  })

  it('shows "Done" when completed', () => {
    render(<Todo title="Wash car" completed={true} />)
    expect(screen.getByText('Wash car')).toBeInTheDocument()
    expect(screen.getByText('Done')).toBeInTheDocument()
  })
})
