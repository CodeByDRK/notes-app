"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Plus, Search, BookMarked, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface QuickActionsProps {
  className?: string
}

export function QuickActions({ className }: QuickActionsProps) {
  const actions = [
    {
      title: "Create Note",
      description: "Start a new note or idea",
      icon: <Plus className="h-5 w-5" />,
      href: "/canvas/new",
      color: "text-primary bg-primary/10",
    },
    {
      title: "Search Ideas",
      description: "Find notes and ideas",
      icon: <Search className="h-5 w-5" />,
      href: "/vault",
      color: "text-amber-500 bg-amber-500/10",
    },
    {
      title: "Browse Categories",
      description: "View your organized notes",
      icon: <BookMarked className="h-5 w-5" />,
      href: "/categories",
      color: "text-blue-500 bg-blue-500/10",
    },
    {
      title: "Get Inspired",
      description: "Explore community ideas",
      icon: <Sparkles className="h-5 w-5" />,
      href: "/community",
      color: "text-green-500 bg-green-500/10",
    },
  ]

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="p-4 pb-2">
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Get started with these common tasks</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="grid gap-3 sm:grid-cols-2">
          {actions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Button
                asChild
                variant="outline"
                className="h-auto w-full justify-start gap-3 p-3 transition-all hover:border-primary/50 hover:bg-muted"
              >
                <Link href={action.href}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${action.color}`}>
                    {action.icon}
                  </div>
                  <div className="text-left">
                    <h3 className="font-medium">{action.title}</h3>
                    <p className="text-xs text-muted-foreground">{action.description}</p>
                  </div>
                </Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
