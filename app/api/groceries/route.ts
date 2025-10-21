import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET
export async function GET() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('groceries')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// POST
export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()
  const { name, quantity } = body

  const { data, error } = await supabase
    .from('groceries')
    .insert([{ name, quantity, purchased: false }])
    .select()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}
