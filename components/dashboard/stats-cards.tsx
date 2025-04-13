"use client"

import { FileText, Eye, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotes } from "@/lib/data/data-service"
import { useEffect, useState } from "react"
import React from "react"

// Client component that renders the stats
function StatsCardsClient({ stats }: { stats: Array<{ title: string; value: number; icon: React.ReactNode; color: string; bgColor: string }> }) {
  return (
    <div className="space-y-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="animate-in fade-in slide-in-from-right-4"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`${stat.bgColor} rounded-full p-1.5 ${stat.color}`}>{stat.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}

// Client component that fetches data and passes it to the render component
export function StatsCards() {
  const [stats, setStats] = useState<Array<{ title: string; value: number; icon: React.ReactNode; color: string; bgColor: string }>>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const notes = await getNotes()
        const totalViews = notes.reduce((acc, note) => acc + note.views, 0)
        const uniqueTags = new Set(notes.flatMap((note) => note.tags)).size

        const statsData = [
          {
            title: "Total Notes",
            value: notes.length,
            icon: <FileText className="h-4 w-4" />,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10",
          },
          {
            title: "Total Views",
            value: totalViews,
            icon: <Eye className="h-4 w-4" />,
            color: "text-green-500",
            bgColor: "bg-green-500/10",
          },
          {
            title: "Unique Tags",
            value: uniqueTags,
            icon: <Tag className="h-4 w-4" />,
            color: "text-amber-500",
            bgColor: "bg-amber-500/10",
          },
        ]
        
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch stats:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3">
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-6 w-6 bg-muted rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return <StatsCardsClient stats={stats} />
}
