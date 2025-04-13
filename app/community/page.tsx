import type { Metadata } from "next"
import { Search, TrendingUp, Users, MessageSquare, Heart, Eye } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { communityNotes, notes } from "@/lib/data/notes"
import { formatDate, extractTextFromHtml } from "@/lib/utils"
import { CommunityNoteDialog } from "@/components/community/community-note-dialog"
import { ShareIdeaDialog } from "@/components/community/share-idea-dialog"

export const metadata: Metadata = {
  title: "Community | Ideaflow",
  description: "Explore ideas from the community",
}

export default function CommunityPage() {
  // Get public notes from the user's collection
  const publicUserNotes = notes
    .filter((note) => note.isPublic)
    .map((note) => ({
      id: note.id,
      title: note.title,
      content: note.content,
      author: {
        id: "current-user",
        name: "John Doe",
        avatar: "/placeholder-user.jpg",
      },
      category: note.category,
      tags: note.tags,
      createdAt: note.createdAt,
      likes: Math.floor(Math.random() * 50),
      comments: Math.floor(Math.random() * 10),
      views: note.views,
    }))

  // Combine community notes with public user notes
  const allCommunityNotes = [...communityNotes, ...publicUserNotes]

  return (
    <div className="flex flex-col gap-6 p-6 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Community</h1>
        <p className="text-muted-foreground">Explore ideas and get inspired by the community</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search community ideas..." className="pl-8" />
        </div>
        <ShareIdeaDialog>
          <Button>Share Your Idea</Button>
        </ShareIdeaDialog>
      </div>

      <Tabs defaultValue="trending" className="w-full">
        <TabsList>
          <TabsTrigger value="trending" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Trending</span>
          </TabsTrigger>
          <TabsTrigger value="latest" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>Latest</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="trending" className="mt-4 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {allCommunityNotes.map((note) => (
              <CommunityNoteDialog key={note.id} note={note}>
                <Card className="overflow-hidden transition-all hover:border-primary/50 card-hover cursor-pointer">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                        <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-base font-medium">{note.title}</CardTitle>
                        <CardDescription className="text-xs">
                          by {note.author.name} • {formatDate(note.createdAt)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-2">
                    <p className="text-sm text-muted-foreground line-clamp-3">{extractTextFromHtml(note.content)}</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{note.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{note.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        <span>{note.views}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              </CommunityNoteDialog>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="latest" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...allCommunityNotes]
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .map((note) => (
                <CommunityNoteDialog key={note.id} note={note}>
                  <Card className="overflow-hidden transition-all hover:border-primary/50 card-hover cursor-pointer">
                    <CardHeader className="p-4 pb-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={note.author.avatar || "/placeholder.svg"} alt={note.author.name} />
                          <AvatarFallback>{note.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-base font-medium">{note.title}</CardTitle>
                          <CardDescription className="text-xs">
                            by {note.author.name} • {formatDate(note.createdAt)}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-2">
                      <p className="text-sm text-muted-foreground line-clamp-3">{extractTextFromHtml(note.content)}</p>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex flex-col items-start gap-2">
                      <div className="flex flex-wrap gap-1">
                        {note.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{note.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>{note.comments}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          <span>{note.views}</span>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </CommunityNoteDialog>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
