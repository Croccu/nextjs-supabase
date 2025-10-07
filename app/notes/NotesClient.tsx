'use client'

import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'


export default function NotesClient() {
  const supabase = createClient()
  const [notes, setNotes] = useState<{ id: number; title: string }[]>([])
  const [newNote, setNewNote] = useState('')

  const fetchNotes = useCallback(async () => {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('id', { ascending: true })
    if (!error && data) setNotes(data)
  }, [supabase])

  useEffect(() => {
    fetchNotes()
  }, [fetchNotes])

  const addNote = async () => {
    console.log('Supabase URL:', supabase)
    if (!newNote.trim()) return

    const {
      data: { user },
    } = await supabase.auth.getUser()

    await supabase.from('notes').insert([
      {
        title: newNote,
        user_id: user?.id,
      },
    ])

    setNewNote('')
    fetchNotes()
  }

  const deleteNote = async (id: number) => {
    await supabase.from('notes').delete().eq('id', id)
    fetchNotes()
  }

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-semibold text-center text-primary">Manage Notes</h2>

      <div className="flex gap-2">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Write a note..."
          className="flex-1 bg-muted text-foreground border border-border px-3 py-2 rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
        />
        <button
          onClick={addNote}
          className="bg-primary hover:bg-primary/80 text-primary-foreground font-medium px-4 py-2 rounded-md transition"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {notes.map((note) => (
          <li
            key={note.id}
            className="flex justify-between items-center bg-muted border border-border rounded-md px-4 py-2 hover:bg-muted/70 transition"
          >
            <span>{note.title}</span>
            <button
              onClick={() => deleteNote(note.id)}
              className="text-destructive hover:text-destructive/80 font-medium transition"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
