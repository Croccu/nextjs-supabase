'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function NotesClient({ initialNotes }: { initialNotes: { id: number; title: string }[] }) {
  const supabase = createClient()
  const [notes, setNotes] = useState<{ id: number; title: string }[]>(initialNotes)
  const [newNote, setNewNote] = useState('')
  const [manageMode, setManageMode] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editingTitle, setEditingTitle] = useState('')

  const fetchNotes = useCallback(async () => {
    const { data } = await supabase.from('notes').select('*').order('id', { ascending: true })
    if (data) setNotes(data)
  }, [supabase])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const addNote = async () => {
    if (!newNote.trim()) return
    const {
      data: { user },
    } = await supabase.auth.getUser()
    await supabase.from('notes').insert([{ title: newNote, user_id: user?.id }])
    setNewNote('')
    fetchNotes()
  }

  const deleteNote = async (id: number) => {
    await supabase.from('notes').delete().eq('id', id)
    fetchNotes()
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
    await supabase.from('notes').update({ title: editingTitle }).eq('id', id)
    cancelEditing()
    fetchNotes()
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-3xl font-bold text-primary leading-none">My Notes</h2>
        <button
          onClick={() => setManageMode(!manageMode)}
          className={`text-sm font-medium px-4 py-1.5 rounded-md transition ${
            manageMode
              ? 'bg-white text-black shadow hover:bg-gray-200'
              : 'bg-primary text-primary-foreground hover:bg-primary/80'
          }`}
        >
          {manageMode ? 'Done' : 'Manage'}
        </button>
      </div>


      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-muted border border-border rounded-md px-4 py-2 hover:bg-muted/70 transition"
          >
            {editingId === note.id ? (
              <div className="flex w-full gap-2">
                <input
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  className="flex-1 bg-card border border-border px-2 py-1 rounded"
                />
                <button
                  onClick={() => saveEdit(note.id)}
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
                <span>{note.title}</span>
                {manageMode && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => startEditing(note.id, note.title)}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="text-destructive hover:text-destructive/80 font-medium transition"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Add note field (bottom, visible only in manage mode) */}
      {manageMode && (
        <div className="flex gap-2 mt-4">
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write a note..."
            className="flex-1 bg-muted text-foreground border border-border px-3 py-2 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <button
            onClick={addNote}
            className="bg-white text-black font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-200 transition"
          >
            Add
          </button>
        </div>
      )}
    </section>
  )
}
