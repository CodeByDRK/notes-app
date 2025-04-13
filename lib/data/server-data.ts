import fs from "fs"
import path from "path"
import type { Note, Category } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const NOTES_FILE = path.join(DATA_DIR, "notes.json")
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize notes file if it doesn't exist
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify([]))
}

// Initialize categories file if it doesn't exist
if (!fs.existsSync(CATEGORIES_FILE)) {
  const defaultCategories = [
    { id: "business", name: "Business", color: "#4CAF50", icon: "Briefcase" },
    { id: "personal", name: "Personal", color: "#2196F3", icon: "User" },
    { id: "ideas", name: "Ideas", color: "#9C27B0", icon: "Lightbulb" },
    { id: "projects", name: "Projects", color: "#FF9800", icon: "Folder" },
  ]
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2))
}

export function getNotes(): Note[] {
  try {
    const data = fs.readFileSync(NOTES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to read notes:", error)
    return []
  }
}

export function getCategories(): Category[] {
  try {
    const data = fs.readFileSync(CATEGORIES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to read categories:", error)
    return []
  }
}

export function getNoteById(id: string): Note | undefined {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

export function getCategoryById(id: string): Category | undefined {
  const categories = getCategories()
  return categories.find((category) => category.id === id)
}

export function getNotesByCategory(categoryId: string): Note[] {
  const notes = getNotes()
  return notes.filter((note) => note.category === categoryId)
}

export function getRecentNotes(limit = 5): Note[] {
  const notes = getNotes()
  return [...notes]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, limit)
}

export function getPinnedNotes(): Note[] {
  const notes = getNotes()
  return notes.filter((note) => note.pinned)
}

export function getPopularTags(limit = 5): { tag: string; count: number }[] {
  const notes = getNotes()
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