"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { BookMarked, FileText } from "lucide-react"
import type { Category } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotesByCategory } from "@/lib/data/data-service"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  const [noteCount, setNoteCount] = useState(0)

  useEffect(() => {
    const loadNoteCount = async () => {
      const notes = await getNotesByCategory(category.id)
      setNoteCount(notes.length)
    }
    loadNoteCount()
  }, [category.id])

  const colorMap: Record<string, string> = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-green-500 bg-green-500/10",
    amber: "text-amber-500 bg-amber-500/10",
    purple: "text-purple-500 bg-purple-500/10",
  }

  const colorClass = colorMap[category.color] || "text-primary bg-primary/10"

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <Link href={`/vault?category=${category.id}`}>
        <Card className="overflow-hidden transition-all hover:border-primary/50 card-hover">
          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full ${colorClass}`}>
                <BookMarked className="h-4 w-4" />
              </div>
              <div>
                <CardTitle className="text-base font-medium">{category.name}</CardTitle>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2">
            <Badge variant="outline" className="text-xs">
              {noteCount} {noteCount === 1 ? "note" : "notes"}
            </Badge>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
