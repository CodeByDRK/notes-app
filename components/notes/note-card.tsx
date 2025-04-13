"use client"

import { useState } from "react"
import { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Globe, MoreVertical, Star, Edit, Trash2 } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { NoteDialog } from "./note-dialog"

interface NoteCardProps {
  note: Note
  onDelete?: (note: Note) => void
  onUpdate?: (note: Note) => void
}

export function NoteCard({ note, onDelete, onUpdate }: NoteCardProps) {
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
      <Card className="hover:bg-accent/50 transition-colors cursor-pointer" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-base font-medium line-clamp-1 flex items-center gap-1">
                {note.title}
                {note.isPublic && <Globe className="h-3 w-3 text-green-500 ml-1" aria-label="Public note" />}
              </CardTitle>
              <CardDescription className="text-xs">
                {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
              </CardDescription>
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
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex flex-wrap gap-1">
            {note.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      <NoteDialog
        note={note}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onNoteUpdated={handleUpdate}
      />
    </>
  )
}
