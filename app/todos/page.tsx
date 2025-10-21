import { createClient } from '@/lib/supabase/server'
import TodoClient from './TodoClient'

export default async function Page() {
  const supabase = await createClient()
  const { data: todos, error } = await supabase
    .from('todos')
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
        <h1 className="text-3xl font-bold text-center text-primary">My Todos</h1>
        <TodoClient initialTodos={todos ?? []} />
      </div>
    </main>
  )
}
