"use client"

import type React from "react"

import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { Star, MoreHorizontal, Eye, Calendar, Globe } from "lucide-react"
import type { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDate, extractTextFromHtml, truncateText, getCategoryById } from "@/lib/utils"
import { toast } from "sonner"

interface NoteListProps {
  notes: Note[]
}

export function NoteList({ notes }: NoteListProps) {
  return (
    <div className="space-y-2">
      {notes.map((note) => (
        <NoteListItem key={note.id} note={note} />
      ))}
    </div>
  )
}

interface NoteListItemProps {
  note: Note
}

function NoteListItem({ note }: NoteListItemProps) {
  const [isPinned, setIsPinned] = useState(note.pinned)
  const category = getCategoryById(note.category)

  const handlePin = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsPinned(!isPinned)
    toast.success(isPinned ? "Note unpinned" : "Note pinned")
  }

  const plainTextContent = extractTextFromHtml(note.content)
  const truncatedContent = truncateText(plainTextContent, 120)

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="note-card"
    >
      <Link href={`/canvas/${note.id}`}>
        <div className="flex items-start gap-4 rounded-lg border p-4 transition-all hover:border-primary/50 hover:bg-muted/50">
          <div className="flex-1">
            <h3 className="font-medium flex items-center gap-1">
              {note.title}
              {note.isPublic && <Globe className="h-3 w-3 text-green-500 ml-1" title="Public note" />}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{truncatedContent}</p>
            <div className="mt-2 flex flex-wrap gap-1">
              {note.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {note.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{note.tags.length - 3}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-primary"
                onClick={handlePin}
              >
                <Star className={`h-4 w-4 ${isPinned ? "fill-primary text-primary" : ""}`} />
                <span className="sr-only">{isPinned ? "Unpin" : "Pin"}</span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.updatedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{note.views}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
