import Link from "next/link"
import type { Metadata } from "next"
import { Clock, Star, Lightbulb, Search, Tag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

import { getRecentNotes, getPinnedNotes, getPopularTags, getCategories } from "@/lib/data/data-service"
import { NoteCard } from "@/components/notes/note-card"
import { CategoryCard } from "@/components/notes/category-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { FeaturedNote } from "@/components/dashboard/featured-note"
import { StatsCards } from "@/components/dashboard/stats-cards"

export const metadata: Metadata = {
  title: "Desk | Ideaflow",
  description: "Your personal dashboard for managing ideas and notes",
}

export default async function DashboardPage() {
  const recentNotes = await getRecentNotes(4)
  const pinnedNotes = await getPinnedNotes()
  const popularTags = await getPopularTags(8)
  const categories = await getCategories()

  // Get a featured note (first pinned note or first recent note)
  const featuredNote = pinnedNotes.length > 0 ? pinnedNotes[0] : recentNotes[0]

  return (
    <div className="flex flex-col gap-6 p-6 animate-in">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Desk</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your notes and ideas.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <QuickActions className="md:col-span-2 lg:col-span-2" />
        <StatsCards />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <Tabs defaultValue="recent" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="recent" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Recent</span>
                </TabsTrigger>
                <TabsTrigger value="pinned" className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>Pinned</span>
                </TabsTrigger>
              </TabsList>
              <Button asChild variant="outline" size="sm" className="gap-1">
                <Link href="/vault">
                  <Search className="h-4 w-4" />
                  <span>View All</span>
                </Link>
              </Button>
            </div>

            <TabsContent value="recent" className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {recentNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pinned" className="mt-4 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {pinnedNotes.length > 0 ? (
                  pinnedNotes.map((note) => <NoteCard key={note.id} note={note} />)
                ) : (
                  <div className="col-span-2 flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <Star className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mt-4 text-lg font-medium">No pinned notes</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Pin your important notes to access them quickly.
                    </p>
                    <Button asChild className="mt-4" variant="outline">
                      <Link href="/vault">Browse Notes</Link>
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold tracking-tight">Categories</h2>
                <p className="text-sm text-muted-foreground">Browse your notes by category</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <FeaturedNote note={featuredNote} />

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Popular Tags</CardTitle>
              <CardDescription>Frequently used tags in your notes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {popularTags.map(({ tag, count }) => (
                  <Link href={`/vault?tag=${tag}`} key={tag}>
                    <Badge variant="secondary" className="flex items-center gap-1 px-2 py-1 hover:bg-secondary/80">
                      <Tag className="h-3 w-3" />
                      <span>{tag}</span>
                      <span className="ml-1 rounded-full bg-primary/10 px-1.5 py-0.5 text-xs">{count}</span>
                    </Badge>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href="/vault">View All Tags</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Quick Tip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Lightbulb className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm">
                    Use <kbd className="rounded border bg-muted px-1 text-xs">Ctrl</kbd> +{" "}
                    <kbd className="rounded border bg-muted px-1 text-xs">Space</kbd> to quickly create a new note from
                    anywhere.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
