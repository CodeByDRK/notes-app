import { getNotes } from "@/lib/data/server-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { QuickNoteDialog } from "@/components/notes/quick-note-dialog"

export default function DeskPage() {
  const notes = getNotes()
  const recentNotes = notes.slice(0, 5)
  const pinnedNotes = notes.filter((note) => note.pinned)

  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Desk</h1>
        <QuickNoteDialog />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Recent Notes</CardTitle>
            <CardDescription>Your most recent notes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {recentNotes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pinned Notes</CardTitle>
            <CardDescription>Your pinned notes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {pinnedNotes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between">
                    <p className="font-medium">{note.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 