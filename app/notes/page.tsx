import { createClient } from '@/lib/supabase/server'
import NotesClient from './NotesClient'

export default async function Page() {
  const supabase = await createClient()

  // Server-side data fetch (SSR)
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Server fetch error:', error)
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card text-foreground border border-border rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)] p-6 space-y-6">
        {/* ✅ Pass server-fetched notes down to client */}
        <NotesClient initialNotes={notes || []} />
      </div>
    </main>
  )
}
