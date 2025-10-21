import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET single grocery by id
export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const params  = await context.params
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('groceries')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// UPDATE grocery
export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const supabase = await createClient()
  const body = await request.json()

  const { data, error } = await supabase
    .from('groceries')
    .update({
      name: body.name,
      quantity: body.quantity,
      purchased: body.purchased,
    })
    .eq('id', params.id)
    .select()

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ data })
}

// DELETE grocery
export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params
  const supabase = await createClient()

  const { error } = await supabase.from('groceries').delete().eq('id', params.id)

  if (error) {
    console.error('Supabase error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: 'Deleted successfully' })
}
