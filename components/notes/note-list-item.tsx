"use client"

import { useState } from "react"
import { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Globe, MoreVertical, Edit, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { NoteDialog } from "./note-dialog"

interface NoteListItemProps {
  note: Note
  onDelete?: (note: Note) => void
  onUpdate?: (note: Note) => void
}

export function NoteListItem({ note, onDelete, onUpdate }: NoteListItemProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleDelete = () => {
    if (onDelete) {
      onDelete(note)
    }
  }

  const handleUpdate = (updatedNote: Note) => {
    if (onUpdate) {
      onUpdate(updatedNote)
    }
  }

  return (
    <>
      <div className="flex items-center justify-between p-4 hover:bg-accent rounded-lg transition-colors cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium truncate flex items-center gap-1">
            {note.title}
            {note.isPublic && <Globe className="h-3 w-3 text-green-500" aria-label="Public note" />}
          </h3>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation()
              setIsDialogOpen(true)
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }} className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <NoteDialog
        note={note}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNoteUpdated={handleUpdate}
      />
    </>
  )
} 