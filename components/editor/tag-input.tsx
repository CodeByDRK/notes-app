"use client"

import type React from "react"

import { useState, useRef, type KeyboardEvent } from "react"
import { X, TagIcon, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface TagInputProps {
  tags: string[]
  onChange: (tags: string[]) => void
  className?: string
}

export function TagInput({ tags, onChange, className }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault()
      addTag(inputValue.trim())
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag]
      onChange(newTags)
      setInputValue("")
    }
  }

  const removeTag = (index: number) => {
    const newTags = [...tags]
    newTags.splice(index, 1)
    onChange(newTags)
  }

  const handleAddClick = () => {
    if (inputValue.trim()) {
      addTag(inputValue.trim())
    }
  }

  const focusInput = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 rounded-md border border-input p-1 focus-within:ring-1 focus-within:ring-ring",
        className,
      )}
      onClick={focusInput}
    >
      <TagIcon className="ml-2 h-4 w-4 text-muted-foreground" />
      {tags.map((tag, index) => (
        <Badge key={index} variant="secondary" className="flex items-center gap-1 px-2 py-1 text-xs">
          {tag}
          <Button
            type="button"
            variant="ghost"
            onClick={() => removeTag(index)}
            className="h-4 w-4 p-0 hover:bg-transparent"
          >
            <X className="h-3 w-3" />
            <span className="sr-only">Remove {tag}</span>
          </Button>
        </Badge>
      ))}
      <div className="flex flex-1 items-center">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="Add tags..."
          className="border-0 p-1 text-sm focus-visible:ring-0"
        />
        {inputValue && (
          <Button type="button" variant="ghost" size="icon" onClick={handleAddClick} className="h-6 w-6">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add tag</span>
          </Button>
        )}
      </div>
    </div>
  )
}
