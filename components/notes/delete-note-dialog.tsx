import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { deleteNote } from "@/lib/data/data-service"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

interface DeleteNoteDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  noteId: string | null
  onDelete: (noteId: string) => void
}

export function DeleteNoteDialog({ open, onOpenChange, noteId, onDelete }: DeleteNoteDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!noteId) return

    setIsDeleting(true)
    try {
      await deleteNote(noteId)
      toast.success("Note deleted successfully")
      onDelete(noteId)
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to delete note")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Note</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this note? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 