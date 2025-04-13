"use client"

import { useState, useRef, useEffect } from "react"
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  className?: string
}

export function RichTextEditor({ content, onChange, className }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Initialize the editor with content
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      // Safely set the initial content
      if (content) {
        editorRef.current.innerHTML = content
      } else {
        editorRef.current.innerHTML = ""
      }
      setIsInitialized(true)
    }
  }, [content, isInitialized])

  // Handle editor input
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  // Format commands
  const execCommand = (command: string, value = "") => {
    document.execCommand(command, false, value)
    handleInput()
    editorRef.current?.focus()
  }

  const formatText = (format: string) => {
    execCommand(format)
  }

  const insertList = (type: string) => {
    // Focus the editor first to ensure the command works
    editorRef.current?.focus()
    // Use a timeout to ensure the focus is applied before the command
    setTimeout(() => {
      execCommand(type)
    }, 0)
  }

  const insertLink = () => {
    const url = prompt("Enter URL:")
    if (url) {
      execCommand("createLink", url)
    }
  }

  return (
    <div className={cn("flex flex-col border rounded-md", className)}>
      <TooltipProvider delayDuration={300}>
        <div className="flex flex-wrap items-center gap-1 border-b bg-muted/50 p-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatText("bold")}>
                <Bold className="h-4 w-4" />
                <span className="sr-only">Bold</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bold</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatText("italic")}>
                <Italic className="h-4 w-4" />
                <span className="sr-only">Italic</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Italic</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => formatText("underline")}>
                <Underline className="h-4 w-4" />
                <span className="sr-only">Underline</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Underline</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertList("insertUnorderedList")}>
                <List className="h-4 w-4" />
                <span className="sr-only">Bullet List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Bullet List</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertList("insertOrderedList")}>
                <ListOrdered className="h-4 w-4" />
                <span className="sr-only">Numbered List</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Numbered List</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyLeft")}>
                <AlignLeft className="h-4 w-4" />
                <span className="sr-only">Align Left</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Left</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyCenter")}>
                <AlignCenter className="h-4 w-4" />
                <span className="sr-only">Align Center</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Center</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => execCommand("justifyRight")}>
                <AlignRight className="h-4 w-4" />
                <span className="sr-only">Align Right</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Align Right</TooltipContent>
          </Tooltip>

          <Separator orientation="vertical" className="mx-1 h-6" />

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={insertLink}>
                <LinkIcon className="h-4 w-4" />
                <span className="sr-only">Insert Link</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Insert Link</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>

      <div
        ref={editorRef}
        className="min-h-[500px] p-4 focus:outline-none overflow-auto"
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
      />
    </div>
  )
}
