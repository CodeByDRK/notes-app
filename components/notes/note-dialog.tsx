"use client"

import { useState, useEffect } from "react"
import { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TagInput } from "@/components/editor/tag-input"
import { Editor } from "@/components/editor/editor"
import { getCategories, saveNote } from "@/lib/data/data-service"
import { toast } from "sonner"

interface NoteDialogProps {
  note: Note | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onNoteUpdated: (note: Note) => void
}

export function NoteDialog({ note, open, onOpenChange, onNoteUpdated }: NoteDialogProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isPublic, setIsPublic] = useState(false)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Reset form when note changes or dialog opens/closes
  useEffect(() => {
    if (note) {
      setTitle(note.title)
      setContent(note.content)
      setCategory(note.category)
      setTags(note.tags)
      setIsPublic(note.isPublic)
    }
    if (!open) {
      setIsEditing(false)
    }
  }, [note, open])

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories()
        setCategories(cats)
      } catch (error) {
        console.error("Failed to load categories:", error)
      }
    }
    loadCategories()
  }, [])

  const handleSave = async () => {
    if (!note) return

    setIsLoading(true)
    try {
      const updatedNote = {
        ...note,
        title,
        content,
        category,
        tags,
        isPublic,
        updatedAt: new Date().toISOString(),
      }

      await saveNote(updatedNote)
      onNoteUpdated(updatedNote)
      setIsEditing(false)
      toast.success("Note updated successfully")
    } catch (error) {
      console.error("Failed to save note:", error)
      toast.error("Failed to save note")
    } finally {
      setIsLoading(false)
    }
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Note title"
                className="text-lg font-semibold"
              />
            ) : (
              note?.title
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4">
          {isEditing ? (
            <>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <TagInput tags={tags} onChange={setTags} />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public">Make note public</Label>
              </div>

              <div className="space-y-2">
                <Label>Content</Label>
                <Editor
                  value={content}
                  onChange={handleContentChange}
                />
              </div>
            </>
          ) : (
            <div className="prose dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: content || "" }} />
            </div>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Note</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 