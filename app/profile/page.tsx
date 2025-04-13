import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Eye, Tag, Clock, Settings, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { notes } from "@/lib/data/notes"
import { getRecentNotes } from "@/lib/utils"
import { NoteCard } from "@/components/notes/note-card"
import { getNotes } from "@/lib/data/server-data"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { QuickNoteDialog } from "@/components/notes/quick-note-dialog"

export const metadata: Metadata = {
  title: "Profile | Ideaflow",
  description: "Your profile and activity",
}

export default function ProfilePage() {
  const notes = getNotes()
  const totalNotes = notes.length
  const publicNotes = notes.filter((note) => note.isPublic).length
  const privateNotes = totalNotes - publicNotes

  const user = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
    plan: "free" as const,
    createdAt: "2023-01-15T10:00:00Z",
    notes: totalNotes,
    views: notes.reduce((acc, note) => acc + note.views, 0),
  }

  const stats = [
    {
      title: "Total Notes",
      value: totalNotes,
      icon: <FileText className="h-4 w-4" />,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Views",
      value: user.views,
      icon: <Eye className="h-4 w-4" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Unique Tags",
      value: new Set(notes.flatMap((note) => note.tags)).size,
      icon: <Tag className="h-4 w-4" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
  ]

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile settings.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold tracking-tight">Note Statistics</h2>
            <div className="grid gap-4">
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-muted-foreground">Total Notes</div>
                <div className="mt-1 text-2xl font-bold">{totalNotes}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-muted-foreground">Public Notes</div>
                <div className="mt-1 text-2xl font-bold">{publicNotes}</div>
              </div>
              <div className="rounded-lg border p-4">
                <div className="text-sm font-medium text-muted-foreground">Private Notes</div>
                <div className="mt-1 text-2xl font-bold">{privateNotes}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
