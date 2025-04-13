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
import { getNotes } from "@/lib/data/data-service"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus } from "lucide-react"
import { QuickNoteDialog } from "@/components/notes/quick-note-dialog"

export const metadata: Metadata = {
  title: "Profile | Ideaflow",
  description: "Your profile and activity",
}

export default async function ProfilePage() {
  const notes = await getNotes()
  const totalNotes = notes.length
  const recentNotes = notes.slice(0, 5)
  const allNotes = notes

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
    <div className="flex h-full flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Profile</h1>
        <QuickNoteDialog />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Notes</CardTitle>
            <CardDescription>Your total number of notes</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{totalNotes}</p>
          </CardContent>
        </Card>
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
            <CardTitle>All Notes</CardTitle>
            <CardDescription>All your notes</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              <div className="space-y-2">
                {allNotes.map((note) => (
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
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{user.name}</CardTitle>
              <CardDescription>{user.email}</CardDescription>
              <div className="mt-1 flex items-center gap-2">
                <Badge variant="secondary">{user.plan === "free" ? "Free Plan" : "Premium"}</Badge>
                <span className="text-xs text-muted-foreground">
                  Since {new Date(user.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map((stat) => (
                <Card key={stat.title}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={`${stat.bgColor} rounded-full p-1.5 ${stat.color}`}>{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Account</h3>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/settings">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start gap-2">
                <Link href="/profile/edit">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Link>
              </Button>
            </div>
            <Separator />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Subscription</h3>
              <div className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Free Plan</h4>
                    <p className="text-xs text-muted-foreground">Basic features</p>
                  </div>
                  <Button size="sm">Upgrade</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="recent" className="w-full">
            <TabsList>
              <TabsTrigger value="recent" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>Recent Activity</span>
              </TabsTrigger>
              <TabsTrigger value="all" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>All Notes</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recent" className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {recentNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {notes.slice(0, 6).map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
              <Button asChild variant="outline" className="w-full">
                <Link href="/vault">View All Notes</Link>
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
