import type { Note, Category } from "@/lib/types"

// Helper function to get the base URL for API calls
function getApiUrl(path: string): string {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    // Use the current origin (protocol + hostname + port)
    return `${window.location.origin}${path}`
  }
  // For server-side rendering, use an absolute URL with localhost
  // Use environment variable for the host if available, fallback to localhost
  const host = process.env.NEXT_PUBLIC_API_HOST || 'http://localhost:3000'
  return `${host}${path}`
}

export async function getNotes(): Promise<Note[]> {
  const response = await fetch(getApiUrl("/api/notes"))
  if (!response.ok) {
    throw new Error("Failed to fetch notes")
  }
  return response.json()
}

export async function getCategories(): Promise<Category[]> {
  const response = await fetch(getApiUrl("/api/categories"))
  if (!response.ok) {
    throw new Error("Failed to fetch categories")
  }
  return response.json()
}

export async function saveNote(note: Note): Promise<void> {
  const response = await fetch(getApiUrl("/api/notes"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  })
  if (!response.ok) {
    throw new Error("Failed to save note")
  }
}

export async function deleteNote(id: string): Promise<void> {
  const response = await fetch(getApiUrl("/api/notes"), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
  if (!response.ok) {
    throw new Error("Failed to delete note")
  }
}

export async function getNoteById(id: string): Promise<Note | undefined> {
  const notes = await getNotes()
  return notes.find((note) => note.id === id)
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
  const categories = await getCategories()
  return categories.find((category) => category.id === id)
}

export async function getNotesByCategory(categoryId: string): Promise<Note[]> {
  const notes = await getNotes()
  return notes.filter((note) => note.category === categoryId)
}

export async function getRecentNotes(limit = 5): Promise<Note[]> {
  const notes = await getNotes()
  return [...notes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

export async function getPinnedNotes(): Promise<Note[]> {
  const notes = await getNotes()
  return notes.filter((note) => note.pinned)
}

export async function getPopularTags(limit = 5): Promise<{ tag: string; count: number }[]> {
  const notes = await getNotes()
  const tagCounts = notes.reduce((acc, note) => {
    note.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1
    })
    return acc
  }, {} as Record<string, number>)

  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
} 