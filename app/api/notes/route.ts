import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { Note } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const NOTES_FILE = path.join(DATA_DIR, "notes.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize notes file if it doesn't exist
if (!fs.existsSync(NOTES_FILE)) {
  fs.writeFileSync(NOTES_FILE, JSON.stringify([]))
}

function getNotes(): Note[] {
  try {
    const data = fs.readFileSync(NOTES_FILE, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to read notes:", error)
    return []
  }
}

function saveNotes(notes: Note[]): void {
  try {
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2))
  } catch (error) {
    console.error("Failed to save notes:", error)
    throw error
  }
}

export async function GET() {
  try {
    const notes = getNotes()
    return NextResponse.json(notes)
  } catch (error) {
    console.error("Failed to get notes:", error)
    return NextResponse.json({ error: "Failed to get notes" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const note: Note = await request.json()
    const notes = getNotes()
    const index = notes.findIndex((n) => n.id === note.id)

    if (index >= 0) {
      notes[index] = note
    } else {
      notes.push(note)
    }

    saveNotes(notes)
    return NextResponse.json({ message: "Note saved successfully" })
  } catch (error) {
    console.error("Failed to save note:", error)
    return NextResponse.json({ error: "Failed to save note" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    const notes = getNotes()
    const filteredNotes = notes.filter((note) => note.id !== id)
    saveNotes(filteredNotes)
    return NextResponse.json({ message: "Note deleted successfully" })
  } catch (error) {
    console.error("Failed to delete note:", error)
    return NextResponse.json({ error: "Failed to delete note" }, { status: 500 })
  }
} 