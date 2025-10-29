"use client"
import { useState } from "react"
import Image from "next/image"
import { TextInput, Button } from "@mantine/core"

type UnsplashPhoto = {
  id: string
  alt_description: string | null
  urls: {
    small: string
  }
}

export default function UnsplashClient() {
  const [photos, setPhotos] = useState<UnsplashPhoto[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)

  const searchPhotos = async () => {
    if (!query) return
    setLoading(true)
    const res = await fetch(`/api/unsplash?query=${query}`)
    const data: UnsplashPhoto[] = await res.json()
    setPhotos(data.filter((p) => p.urls && p.urls.small))
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="text-2xl font-bold text-center">Unsplash API demo</h1>

      <div className="flex gap-2 w-full max-w-md">
        <TextInput
          placeholder="Otsi pilti (nt: cats, Estonia...)"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
          className="flex-1"
        />
        <Button onClick={searchPhotos} color="white" loading={loading} styles={{label: { color: 'black' }}}>
          Otsi
        </Button>
      </div>

      {photos.length === 0 && !loading && (
        <p className="text-gray-400 text-sm mt-6">Sisesta otsingusõna, et näha pilte.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="rounded-lg overflow-hidden shadow-md bg-neutral-900"
          >
            <Image
              src={photo.urls.small}
              alt={photo.alt_description || "Unsplash photo"}
              width={400}
              height={300}
              className="w-full h-48 object-cover"
            />
            <p className="p-2 text-sm text-gray-400">
              {photo.alt_description || "No description"}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
