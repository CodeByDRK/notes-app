import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { Plus, Star, Trash2 } from "lucide-react"
import { QuickNoteDialog } from "@/components/notes/quick-note-dialog"
import { useRef } from "react"

export function Sidebar() {
  const pathname = usePathname()
  const dialogRef = useRef<{ setOpen: (open: boolean) => void }>(null)

  const openQuickNoteDialog = () => {
    dialogRef.current?.setOpen(true)
  }

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between px-4">
        <h2 className="text-lg font-semibold">Notes</h2>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-2 p-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === "/" && "bg-muted"
            )}
            onClick={openQuickNoteDialog}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Note
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === "/pinned" && "bg-muted"
            )}
          >
            <Star className="mr-2 h-4 w-4" />
            Pinned
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === "/trash" && "bg-muted"
            )}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Trash
          </Button>
        </div>
      </ScrollArea>
      <QuickNoteDialog ref={dialogRef} />
    </div>
  )
} 