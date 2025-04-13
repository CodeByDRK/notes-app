"use client"

import type React from "react"

import { useState } from "react"
import { Heart, MessageSquare, Eye } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { formatDate } from "@/lib/utils"
import type { CommunityNote } from "@/lib/types"
import { toast } from "sonner"

interface CommunityNoteDialogProps {
  note: CommunityNote
  children: React.ReactNode
}

export function CommunityNoteDialog({ note, children }: CommunityNoteDialogProps) {
  const [open, setOpen] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(note.likes)

  const handleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
      setLiked(false)
      toast.success("Like removed")
    } else {
      setLikeCount(likeCount + 1)
      setLiked(true)
      toast.success("Idea liked!")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{children}</div>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
              <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl">{note.title}</DialogTitle>
              <DialogDescription>
                by {note.author.name} • {formatDate(note.createdAt)}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap gap-1 my-2">
          {note.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="prose dark:prose-invert max-w-none my-4" dangerouslySetInnerHTML={{ __html: note.content }} />

        <Separator />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${liked ? "text-red-500" : ""}`}
              onClick={handleLike}
            >
              <Heart className={`h-4 w-4 ${liked ? "fill-red-500" : ""}`} />
              <span>{likeCount}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1">
              <MessageSquare className="h-4 w-4" />
              <span>{note.comments}</span>
            </Button>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>{note.views} views</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
