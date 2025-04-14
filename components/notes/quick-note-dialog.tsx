"use client"

import { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TagInput } from "@/components/editor/tag-input"
import { EditorToolbar } from "@/components/editor/editor-toolbar"
import { getCategories, saveNote, deleteNote } from "@/lib/data/data-service"
import { toast } from "sonner"
import { Save, Trash2 } from "lucide-react"
import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import Highlight from "@tiptap/extension-highlight"
import Strike from "@tiptap/extension-strike"

interface QuickNoteDialogProps {
  noteId?: string
  onDelete?: (noteId: string) => void
}

export const QuickNoteDialog = forwardRef<{ setOpen: (open: boolean) => void }, QuickNoteDialogProps>(
  ({ noteId, onDelete }, ref) => {
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState("")
    const [category, setCategory] = useState("")
    const [tags, setTags] = useState<string[]>([])
    const [isPinned, setIsPinned] = useState(false)
    const [isPublic, setIsPublic] = useState(false)
    const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
    const [isSaving, setIsSaving] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const router = useRouter()

    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight.configure({
          multicolor: true,
        }),
        Strike,
      ],
      content: "",
      editorProps: {
        attributes: {
          class: "prose dark:prose-invert max-w-none focus:outline-none min-h-[200px] p-4",
        },
      },
    })

    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === " ") {
          e.preventDefault()
          setOpen(true)
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    useEffect(() => {
      const loadCategories = async () => {
        try {
          const cats = await getCategories()
          setCategories(cats)
          if (cats.length > 0) {
            setCategory(cats[0].id)
          }
        } catch (error) {
          toast.error("Failed to load categories")
        }
      }
      loadCategories()
    }, [])

    useImperativeHandle(ref, () => ({
      setOpen,
    }))

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()
      if (!editor) return

      setIsSaving(true)
      try {
        const note = {
          id: noteId || crypto.randomUUID(),
          title: title || "Untitled Note",
          content: editor.getHTML(),
          category,
          tags,
          pinned: isPinned,
          isPublic,
          views: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        await saveNote(note)
        toast.success("Note saved successfully")
        resetForm()
        setOpen(false)
        router.push(`/`)
      } catch (error) {
        toast.error("Failed to save note")
      } finally {
        setIsSaving(false)
      }
    }

    const handleDelete = async () => {
      if (!noteId) return

      setIsDeleting(true)
      try {
        await deleteNote(noteId)
        toast.success("Note deleted successfully")
        if (onDelete) {
          onDelete(noteId)
        }
        resetForm()
        setOpen(false)
        router.push(`/`)
      } catch (error) {
        toast.error("Failed to delete note")
      } finally {
        setIsDeleting(false)
      }
    }

    const resetForm = () => {
      setTitle("")
      editor?.commands.setContent("")
      setCategory(categories[0]?.id || "")
      setTags([])
      setIsPinned(false)
      setIsPublic(false)
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Quick Note</DialogTitle>
            {noteId && (
              <DialogDescription>
                Are you sure you want to delete this note? This action cannot be undone.
              </DialogDescription>
            )}
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Untitled Note"
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <div className="border rounded-md">
                <EditorToolbar editor={editor} />
                <EditorContent editor={editor} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="pinned"
                  checked={isPinned}
                  onCheckedChange={setIsPinned}
                />
                <Label htmlFor="pinned">Pin Note</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="public"
                  checked={isPublic}
                  onCheckedChange={setIsPublic}
                />
                <Label htmlFor="public">Public</Label>
              </div>
            </div>
            <DialogFooter>
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                {noteId && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="gap-2"
                  >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </Button>
                )}
                <Button type="submit" disabled={isSaving} className="gap-2">
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Note"}
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    )
  }
) 