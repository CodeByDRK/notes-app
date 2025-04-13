export interface Note {
  id: string
  title: string
  content: string
  category: string
  tags: string[]
  pinned: boolean
  isPublic: boolean
  views: number
  createdAt: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  color: string
  icon: string
}

export interface CommunityNote {
  id: string
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
  }
  category: string
  tags: string[]
  createdAt: string
  likes: number
  comments: number
  views: number
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  plan: "free" | "premium"
  createdAt: string
  notes: number
  views: number
}
