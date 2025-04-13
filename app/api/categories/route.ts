import { NextResponse } from "next/server"
import fs from "fs"
import path from "path"
import type { Category } from "@/lib/types"

const DATA_DIR = path.join(process.cwd(), "data")
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json")

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

// Initialize categories file if it doesn't exist
if (!fs.existsSync(CATEGORIES_FILE)) {
  const defaultCategories: Category[] = [
    {
      id: "business",
      name: "Business",
      color: "blue",
      icon: "BookMarked",
    },
    {
      id: "personal",
      name: "Personal",
      color: "green",
      icon: "BookMarked",
    },
    {
      id: "ideas",
      name: "Ideas",
      color: "amber",
      icon: "BookMarked",
    },
    {
      id: "projects",
      name: "Projects",
      color: "purple",
      icon: "BookMarked",
    },
  ]
  fs.writeFileSync(CATEGORIES_FILE, JSON.stringify(defaultCategories, null, 2))
}

export async function GET() {
  try {
    const data = await fs.promises.readFile(CATEGORIES_FILE, "utf-8")
    const categories = JSON.parse(data)
    return NextResponse.json(categories)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 })
  }
} 