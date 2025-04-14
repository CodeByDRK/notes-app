import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Eye, Tag, Clock, Settings, Edit, User, Mail, Calendar, Share2, Lock, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
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
  const recentNotes = notes.slice(0, 5)

  const user = {
    id: "user-1",
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
    plan: "free" as const,
    createdAt: "2023-01-15T10:00:00Z",
    notes: totalNotes,
    views: notes.reduce((acc, note) => acc + note.views, 0),
    bio: "Product designer and creative thinker. I love capturing ideas and organizing them into meaningful collections.",
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
      title: "Public Notes",
      value: publicNotes,
      icon: <Share2 className="h-4 w-4" />,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Private Notes",
      value: privateNotes,
      icon: <Lock className="h-4 w-4" />,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      title: "Total Views",
      value: user.views,
      icon: <Eye className="h-4 w-4" />,
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      title: "Unique Tags",
      value: new Set(notes.flatMap((note) => note.tags)).size,
      icon: <Tag className="h-4 w-4" />,
      color: "text-pink-500",
      bgColor: "bg-pink-500/10",
    },
    {
      title: "Member Since",
      value: new Date(user.createdAt).toLocaleDateString("en-US", { year: 'numeric', month: 'short' }),
      icon: <Calendar className="h-4 w-4" />,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ]

  return (
    <div className="flex flex-col gap-8 p-6 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">View and manage your profile and activity</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* User Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <CardTitle>Your Profile</CardTitle>
            <CardDescription>Personal information and account details</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center gap-4">
            <Avatar className="h-24 w-24 border-2 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-lg">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-xl font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.bio}</p>
            </div>
            <div className="w-full space-y-3 pt-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Joined {new Date(user.createdAt).toLocaleDateString("en-US", { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="gap-1">
                  <BarChart2 className="h-3 w-3" />
                  {user.plan.charAt(0).toUpperCase() + user.plan.slice(1)} Plan
                </Badge>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4 flex justify-center">
            <Button variant="outline" className="gap-1" asChild>
              <Link href="/settings">
                <Settings className="h-4 w-4" />
                <span>Edit Profile</span>
              </Link>
            </Button>
          </CardFooter>
        </Card>
          
        {/* Stats and Activity */}
        <div className="space-y-8 md:col-span-2">
          {/* Stats Grid */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
              <CardDescription>Your note activity and engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="flex flex-col gap-2 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-full ${stat.bgColor}`}>
                      <div className={stat.color}>{stat.icon}</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
            
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest notes and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4">
                  {recentNotes.length > 0 ? (
                    recentNotes.map((note) => (
                      <div key={note.id} className="flex items-start gap-4 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${note.isPublic ? 'bg-green-500/10' : 'bg-purple-500/10'}`}>
                          {note.isPublic ? 
                            <Share2 className="h-5 w-5 text-green-500" /> : 
                            <Lock className="h-5 w-5 text-purple-500" />
                          }
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium leading-none">{note.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {note.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                          </p>
                          {note.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 pt-1">
                              {note.tags.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {note.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{note.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-medium">No notes yet</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Start creating notes to see your activity here.
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Button variant="outline" className="gap-1" asChild>
                <Link href="/vault">
                  <Eye className="h-4 w-4" />
                  <span>View All Notes</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
