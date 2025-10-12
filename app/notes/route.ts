import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET
export async function GET() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}


export async function POST() {
  return Response.json({ message: 'POST' })
}


export async function PUT() {
  return Response.json({ message: 'PUT' })
}


export async function DELETE() {
  return Response.json({ message: 'DELETE' })
}
