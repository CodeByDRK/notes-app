import { useEffect, useRef } from "react"
import { Editor as TiptapEditor } from "@tiptap/core"
import StarterKit from "@tiptap/starter-kit"
import { useEditor } from "@tiptap/react"
import { cn } from "@/lib/utils"

interface EditorProps {
  value: string
  onChange: (value: string) => void
  className?: string
}

export function Editor({ value, onChange, className }: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value)
    }
  }, [value, editor])

  return (
    <div className={cn("relative min-h-[500px] w-full", className)}>
      <div
        ref={editorRef}
        className="prose dark:prose-invert max-w-none p-4 focus:outline-none"
      >
        {editor && (
          <div
            contentEditable
            suppressContentEditableWarning
            className="min-h-[500px] w-full"
          />
        )}
      </div>
    </div>
  )
} 