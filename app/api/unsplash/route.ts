import { NextResponse } from "next/server"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get("query") || "nature"

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=9&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
  )

  const data = await res.json()
  return NextResponse.json(data.results || [])
}
