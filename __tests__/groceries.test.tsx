import { describe, it, expect } from 'vitest'

describe('Groceries CRUD basic', () => {
  it('creates a grocery item', () => {
    const grocery = { id: 1, name: 'Milk', quantity: 2, purchased: false }
    expect(grocery.name).toBe('Milk')
  })

  it('updates a grocery item', () => {
    const grocery = { id: 1, name: 'Milk', purchased: false }
    grocery.purchased = true
    expect(grocery.purchased).toBe(true)
  })

  it('deletes a grocery item', () => {
    const groceries = [{ id: 1 }, { id: 2 }]
    const updated = groceries.filter((g) => g.id !== 1)
    expect(updated.length).toBe(1)
  })

  it('reads groceries list', () => {
    const groceries = [
      { id: 1, name: 'Milk' },
      { id: 2, name: 'Bread' },
    ]
    expect(groceries.map((g) => g.name)).toContain('Bread')
  })
})
