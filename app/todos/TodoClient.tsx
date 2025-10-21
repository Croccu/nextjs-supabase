'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

// define the todo type
type Todo = {
  id: number
  title: string
  completed: boolean
}

// define props type for server-provided todos
interface TodoClientProps {
  initialTodos: Todo[]
}

export default function TodoClient({ initialTodos }: TodoClientProps) {
  const supabase = createClient()
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodo, setNewTodo] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const fetchTodos = useCallback(async () => {
    const { data } = await supabase.from('todos').select('*').order('id', { ascending: true })
    if (data) setTodos(data)
  }, [supabase])

  useEffect(() => {
    fetchTodos()
  }, [fetchTodos])

  const addTodo = async () => {
    if (!newTodo.trim()) return
    const { data: { user } } = await supabase.auth.getUser()
    await supabase.from('todos').insert([{ title: newTodo, completed: false, user_id: user?.id }])
    setNewTodo('')
    fetchTodos()
  }

  const deleteTodo = async (id: number) => {
    await supabase.from('todos').delete().eq('id', id)
    fetchTodos()
  }

  const startEditing = (id: number, title: string) => {
    setEditingId(id)
    setEditingTitle(title)
  }

  const cancelEditing = () => {
    setEditingId(null)
    setEditingTitle('')
  }

  const saveEdit = async (id: number) => {
    if (!editingTitle.trim()) return
    await supabase.from('todos').update({ title: editingTitle }).eq('id', id)
    cancelEditing()
    fetchTodos()
  }

  return (
    <section className="space-y-4">
      <div className="flex gap-2">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a todo..."
          className="flex-1 bg-muted text-foreground border border-border px-3 py-2 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button
          onClick={addTodo}
          className="bg-primary text-primary-foreground font-semibold px-4 py-2 rounded-md hover:bg-primary/80 transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex justify-between items-center bg-muted border border-border rounded-md px-4 py-2 hover:bg-muted/70 transition"
          >
            {editingId === todo.id ? (
              <div className="flex w-full gap-2">
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 bg-card border border-border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="text-green-500 font-semibold hover:text-green-600"
                >
                  Save
                </button>
                <button
                  onClick={cancelEditing}
                  className="text-gray-400 hover:text-gray-600"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{todo.title}</span>
                <div className="flex gap-3">
                  <button
                    onClick={() => startEditing(todo.id, todo.title)}
                    className="text-blue-500 hover:text-blue-600 font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="text-destructive hover:text-destructive/80 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
