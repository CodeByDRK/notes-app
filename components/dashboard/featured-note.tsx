"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Star, Calendar } from "lucide-react"
import type { Note } from "@/lib/types"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { formatDate, extractTextFromHtml, truncateText } from "@/lib/utils"

interface FeaturedNoteProps {
  note: Note
}

export function FeaturedNote({ note }: FeaturedNoteProps) {
  const plainTextContent = extractTextFromHtml(note.content)
  const truncatedContent = truncateText(plainTextContent, 150)

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden">
        <CardHeader className="pb-2 space-y-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
              <Star className="h-3 w-3 text-primary" />
            </div>
            <CardDescription>Today's Top Idea</CardDescription>
          </div>
          <CardTitle className="line-clamp-1">{note.title}</CardTitle>
        </CardHeader>
        <CardContent className="pb-2">
          <p className="text-sm text-muted-foreground line-clamp-4">{truncatedContent}</p>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-2">
          <div className="flex flex-wrap gap-1">
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(note.updatedAt)}</span>
            </div>
          </div>
          <Button asChild className="w-full mt-2">
            <Link href={`/canvas/${note.id}`}>Open Note</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
