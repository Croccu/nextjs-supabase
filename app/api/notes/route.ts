import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'


// GET
export async function GET() {
  const supabase = await createClient()
  console.log('➡️ GET /api/notes called')

  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}


export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
  .from('notes')
  .insert([{title: body.title, content: body.content}])
  .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}


// These are under app/api/notes/[id]/route.ts, but included here for completeness

// export async function PUT() {
//   return Response.json({ message: 'PUT' })
// }


// export async function DELETE() {
//   return Response.json({ message: 'DELETE' })
// }
