import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Search, Filter, Grid, List, ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getCategoryById, getNotesByCategory } from "@/lib/data/data-service"
import { NoteCard } from "@/components/notes/note-card"
import { NoteList } from "@/components/notes/note-list"

interface CategoryPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = await getCategoryById(params.id)

  if (!category) {
    return {
      title: "Category Not Found | Ideaflow",
    }
  }

  return {
    title: `${category.name} Notes | Ideaflow`,
    description: `Browse your ${category.name.toLowerCase()} notes and ideas`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = await getCategoryById(params.id)

  if (!category) {
    notFound()
  }

  const categoryNotes = await getNotesByCategory(params.id)

  return (
    <div className="flex flex-col gap-6 p-6 animate-in">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild className="h-8 w-8">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
          <p className="text-muted-foreground">Browse your {category.name.toLowerCase()} notes and ideas</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder={`Search ${category.name.toLowerCase()} notes...`} className="pl-8" />
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
      </div>

      <Separator />

      <Tabs defaultValue="grid" className="flex-1">
        <TabsContent value="grid" className="mt-0">
          {categoryNotes.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {categoryNotes.map((note) => (
                <NoteCard key={note.id} note={note} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No notes found</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new note to get started
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        <TabsContent value="list" className="mt-0">
          {categoryNotes.length > 0 ? (
            <NoteList notes={categoryNotes} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">No notes found</h3>
                <p className="text-sm text-muted-foreground">
                  Create a new note to get started
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
