import { createClient } from '@/lib/supabase/server'
import NotesClient from './NotesClient'

export default async function Page() {
  const supabase = await createClient()
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('id', { ascending: true })

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 font-medium">Error: {error.message}</p>
      </div>
    )

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card text-foreground border border-border rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-primary">My Notes</h1>

        {notes && notes.length > 0 ? (
          <ul className="space-y-3">
            {notes.map((note) => (
              <li
                key={note.id}
                className="px-4 py-2 rounded-md bg-muted text-muted-foreground border border-border hover:bg-muted/70 transition"
              >
                {note.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-muted-foreground italic">No notes yet.</p>
        )}

        <NotesClient />
      </div>
    </main>
  )
}
