"use client"

import { useState } from "react"
import { Lightbulb, Sparkles, Quote, Globe, Lock } from "lucide-react"
import type { Note } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { TagInput } from "@/components/editor/tag-input"
import { toast } from "sonner"

interface EditorSidebarProps {
  note: Note
  category: string
  categories: { id: string; name: string }[]
  tags: string[]
  isPublic: boolean
  onCategoryChange: (category: string) => void
  onTagsChange: (tags: string[]) => void
  onVisibilityToggle: () => void
}

export function EditorSidebar({
  note,
  category,
  categories,
  tags,
  isPublic,
  onCategoryChange,
  onTagsChange,
  onVisibilityToggle,
}: EditorSidebarProps) {
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false)

  const quotes = [
    {
      text: "The best way to predict the future is to create it.",
      author: "Peter Drucker",
    },
    {
      text: "Creativity is intelligence having fun.",
      author: "Albert Einstein",
    },
    {
      text: "Ideas are worthless until you get them out of your head to see what they can do.",
      author: "Tanner Christensen",
    },
  ]

  const suggestedTags = ["productivity", "goals", "ideas", "project", "learning", "reflection"]

  const handleAddTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag])
      toast.success(`Tag "${tag}" added`)
    }
  }

  const handleUpgrade = () => {
    toast("This is a premium feature", {
      description: "Upgrade to access AI-powered suggestions.",
      action: {
        label: "Upgrade",
        onClick: () => toast.success("Redirecting to upgrade page..."),
      },
    })
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <TagInput tags={tags} onChange={onTagsChange} />
            <div className="flex flex-wrap gap-1 mt-2">
              {suggestedTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => handleAddTag(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <Label className="flex items-center gap-2">
              {isPublic ? (
                <>
                  <Globe className="h-4 w-4" />
                  Public
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Private
                </>
              )}
            </Label>
            <Switch checked={isPublic} onCheckedChange={onVisibilityToggle} />
          </div>
        </div>

        <Separator />

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Quote className="h-4 w-4 text-blue-500" />
              Inspirational Quotes
            </CardTitle>
            <CardDescription>Wisdom to spark your creativity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quotes.map((quote, index) => (
              <div key={index} className="space-y-1">
                <p className="text-sm italic">"{quote.text}"</p>
                <p className="text-xs text-muted-foreground text-right">— {quote.author}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {showPremiumFeatures ? (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-purple-500" />
                AI Suggestions
              </CardTitle>
              <CardDescription>Get AI-powered writing suggestions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" onClick={handleUpgrade}>
                Upgrade to Pro
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Button variant="ghost" className="w-full" onClick={() => setShowPremiumFeatures(true)}>
            Show Premium Features
          </Button>
        )}
      </div>
    </div>
  )
}
