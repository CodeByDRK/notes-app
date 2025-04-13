import type { Metadata } from "next"
import { NoteEditor } from "@/components/editor/note-editor"

export const metadata: Metadata = {
  title: "New Note | Ideaflow",
  description: "Create a new note",
}

export default function NewNotePage() {
  const emptyNote = {
    id: "new",
    title: "Untitled Note",
    content: "",
    category: "personal",
    tags: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pinned: false,
    views: 0,
    isPublic: false, // Default to private
  }

  return <NoteEditor note={emptyNote} isNew />
}
