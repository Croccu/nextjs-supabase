import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import '@testing-library/jest-dom'

// a simple dummy Notes component
function Notes({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  )
}

describe('Notes component', () => {
  it('renders note title and content', () => {
    render(<Notes title="Test note" content="Hello world" />)
    expect(screen.getByText('Test note')).toBeInTheDocument()
    expect(screen.getByText('Hello world')).toBeInTheDocument()
  })
})
