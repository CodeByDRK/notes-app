import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import { Category } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize categories file if it doesn't exist
if (!fs.existsSync(CATEGORIES_FILE)) {
  const defaultCategories = [
    { id: "business", name: "Business", color: "#4CAF50", icon: "Briefcase" },
    { id: "personal", name: "Personal", color: "#2196F3", icon: "User" },
    { id: "ideas", name: "Ideas", color: "#9C27B0", icon: "Lightbulb" },
    { id: "projects", name: "Projects", color: "#FF9800", icon: "Folder" },
  ]
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2))
}

export async function GET() {
  try {
    const data = fs.readFileSync(CATEGORIES_FILE, "utf-8")
    const categories = JSON.parse(data)
    return NextResponse.json(categories)
  } catch (error) {
    console.error("Failed to get categories:", error)
    return NextResponse.json({ error: "Failed to get categories" }, { status: 500 })
  }
} 