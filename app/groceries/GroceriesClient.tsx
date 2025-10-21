'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

type Grocery = {
  id: number
  name: string
  quantity: number
  purchased: boolean
  inserted_at?: string
}

export default function GroceriesClient() {
  const supabase = createClient()
  const [groceries, setGroceries] = useState<Grocery[]>([])
  const [name, setName] = useState('')
  const [quantity, setQuantity] = useState(1)

  const fetchGroceries = useCallback(async () => {
    const { data, error } = await supabase
      .from('groceries')
      .select('*')
      .order('id', { ascending: true })

    if (error) console.error('Error fetching groceries:', error)
    else setGroceries(data ?? [])
  }, [supabase])

  useEffect(() => {
    fetchGroceries()
  }, [fetchGroceries])

  async function addGrocery() {
    if (!name.trim()) return
    const { error } = await supabase.from('groceries').insert([{ name, quantity, purchased: false }])
    if (error) console.error('Error adding grocery:', error)
    else {
      setName('')
      setQuantity(1)
      fetchGroceries()
    }
  }

  async function togglePurchased(id: number, purchased: boolean) {
    const { error } = await supabase.from('groceries').update({ purchased: !purchased }).eq('id', id)
    if (error) console.error('Error updating grocery:', error)
    else fetchGroceries()
  }

  async function deleteGrocery(id: number) {
    const { error } = await supabase.from('groceries').delete().eq('id', id)
    if (error) console.error('Error deleting grocery:', error)
    else fetchGroceries()
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Qty"
          value={quantity}
          min="1"
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 p-2 border rounded"
        />
        <button onClick={addGrocery} className="px-4 py-2 bg-primary text-black rounded hover:bg-primary/80">
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {groceries.map((g) => (
          <li key={g.id} className="flex justify-between items-center p-2 border rounded">
            <span className={g.purchased ? 'line-through text-gray-500' : ''}>
              {g.name} ({g.quantity})
            </span>
            <div className="space-x-2">
              <button
                onClick={() => togglePurchased(g.id, g.purchased)}
                className="px-2 py-1 border rounded hover:bg-accent"
              >
                {g.purchased ? 'Unmark' : 'Bought'}
              </button>
              <button
                onClick={() => deleteGrocery(g.id)}
                className="px-2 py-1 border rounded hover:bg-destructive text-destructive"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
