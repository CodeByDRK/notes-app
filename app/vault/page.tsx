import type { Metadata } from "next"
import { Search, Filter, Grid, List } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getNotes, getPopularTags } from "@/lib/data/server-data"
import { NoteCard } from "@/components/notes/note-card"
import { NoteList } from "@/components/notes/note-list"

export const metadata: Metadata = {
  title: "Vault | Ideaflow",
  description: "Search and organize your notes",
}

export default function VaultPage() {
  const notes = getNotes()
  const popularTags = getPopularTags(12)

  return (
    <div className="flex flex-col gap-6 p-6 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Vault</h1>
        <p className="text-muted-foreground">Search, filter, and organize your notes and ideas</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search notes..." className="pl-8" />
          </div>
          <div className="flex items-center gap-2">
            <Select defaultValue="updated">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="updated">Last Updated</SelectItem>
                <SelectItem value="created">Date Created</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="views">Most Viewed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Tabs defaultValue="grid" className="hidden sm:block">
              <TabsList>
                <TabsTrigger value="grid" className="px-3">
                  <Grid className="h-4 w-4" />
                </TabsTrigger>
                <TabsTrigger value="list" className="px-3">
                  <List className="h-4 w-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="flex items-center gap-1 px-3 py-1">
            All Notes
            <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs">{notes.length}</span>
          </Badge>
          {popularTags.slice(0, 8).map(({ tag, count }) => (
            <Badge key={tag} variant="outline" className="flex items-center gap-1 px-3 py-1">
              {tag}
              <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs">{count}</span>
            </Badge>
          ))}
        </div>
      </div>

      <Separator />

      <Tabs defaultValue="grid" className="flex-1">
        <TabsContent value="grid" className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          <NoteList notes={notes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
