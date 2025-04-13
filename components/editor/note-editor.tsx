"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Save, ArrowLeft, Star, MoreHorizontal, Trash2, Share, Copy, Lightbulb, Globe, Lock, Menu, Pin } from "lucide-react"

import type { Note } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { getCategories, saveNote, deleteNote } from "@/lib/data/data-service"
import { RichTextEditor } from "@/components/editor/rich-text-editor"
import { TagInput } from "@/components/editor/tag-input"
import { EditorSidebar } from "@/components/editor/editor-sidebar"
import { formatDate, getCategoryById } from "@/lib/utils"
import { Editor } from "@/components/editor/editor"

interface NoteEditorProps {
  note: Note
  isNew?: boolean
}

export function NoteEditor({ note, isNew = false }: NoteEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [category, setCategory] = useState(note.category)
  const [tags, setTags] = useState(note.tags)
  const [isPinned, setIsPinned] = useState(note.pinned)
  const [isPublic, setIsPublic] = useState(note.isPublic || false)
  const [isSaving, setIsSaving] = useState(false)
  const [isEdited, setIsEdited] = useState(false)
  const [showSidebar, setShowSidebar] = useState(true)
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    const loadCategories = async () => {
      const cats = await getCategories()
      setCategories(cats)
    }
    loadCategories()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isEdited) {
        e.preventDefault()
        e.returnValue = ""
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [isEdited])

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
    setIsEdited(true)
  }

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    setIsEdited(true)
  }

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory)
    setIsEdited(true)
  }

  const handleTagsChange = (newTags: string[]) => {
    setTags(newTags)
    setIsEdited(true)
  }

  const handlePinToggle = () => {
    setIsPinned(!isPinned)
    setIsEdited(true)
    toast.success(isPinned ? "Note unpinned" : "Note pinned")
  }

  const handleVisibilityToggle = () => {
    setIsPublic(!isPublic)
    setIsEdited(true)
    toast.success(isPublic ? "Note set to private" : "Note set to public")
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const updatedNote = {
        ...note,
        title,
        content,
        category,
        tags,
        pinned: isPinned,
        isPublic,
        updatedAt: new Date().toISOString(),
      }

      await saveNote(updatedNote)
      setIsEdited(false)
      toast.success("Note saved successfully")
    } catch (error) {
      toast.error("Failed to save note")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return

    try {
      await deleteNote(note.id)
      toast.success("Note deleted successfully")
      router.push("/")
    } catch (error) {
      toast.error("Failed to delete note")
    }
  }

  const selectedCategory = getCategoryById(category)

  return (
    <div className="flex h-full">
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Untitled Note"
              className="text-2xl font-semibold bg-transparent border-none outline-none w-full"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsPinned(!isPinned)}
              className={isPinned ? "text-amber-500" : ""}
            >
              <Pin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleSave}>
              <Save className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDelete}>
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-hidden">
          <Editor
            value={content}
            onChange={setContent}
            className="h-full"
          />
        </div>
      </div>
      <div
        className={`${
          showSidebar ? "block" : "hidden"
        } md:block w-80 border-l bg-muted/50`}
      >
        <EditorSidebar
          note={note}
          category={category}
          categories={categories}
          tags={tags}
          isPublic={isPublic}
          onCategoryChange={setCategory}
          onTagsChange={setTags}
          onVisibilityToggle={() => setIsPublic(!isPublic)}
        />
      </div>
    </div>
  )
}
