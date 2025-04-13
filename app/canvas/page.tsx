import { redirect } from "next/navigation"

export default function CanvasPage() {
  // Redirect to the new note page
  redirect("/canvas/new")
}
