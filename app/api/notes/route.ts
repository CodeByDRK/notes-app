import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Note } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const NOTES_FILE = path.join(DATA_DIR, "notes.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize notes file if it doesn't exist
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify([], null, 2))
}

export async function GET() {
  try {
    const data = await fs.promises.readFile(NOTES_FILE, "utf-8")
    const notes = JSON.parse(data)
    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const note = await request.json()
    const data = await fs.promises.readFile(NOTES_FILE, "utf-8")
    const notes = JSON.parse(data)
    
    const existingIndex = notes.findIndex((n: Note) => n.id === note.id)
    if (existingIndex >= 0) {
      notes[existingIndex] = note
    } else {
      notes.push(note)
    }
    
    await fs.promises.writeFile(NOTES_FILE, JSON.stringify(notes, null, 2))
    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const data = await fs.promises.readFile(NOTES_FILE, "utf-8")
    const notes = JSON.parse(data)
    const filteredNotes = notes.filter((note: Note) => note.id !== id)
    await fs.promises.writeFile(NOTES_FILE, JSON.stringify(filteredNotes, null, 2))
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
} 