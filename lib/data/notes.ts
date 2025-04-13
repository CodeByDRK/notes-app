import type { Note, Category } from "@/lib/types"

export const categories: Category[] = [
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

export const notes: Note[] = [
  {
    id: "note-1",
    title: "Product Launch Strategy",
    content:
      "<p>Key points for our upcoming product launch:</p><ul><li>Finalize marketing materials by June 15</li><li>Schedule social media campaign</li><li>Prepare press release</li><li>Coordinate with sales team</li></ul><p>Budget allocation: $15,000</p>",
    category: "business",
    tags: ["marketing", "product", "launch"],
    createdAt: "2023-06-01T10:30:00Z",
    updatedAt: "2023-06-05T14:20:00Z",
    pinned: true,
    views: 42,
    isPublic: false,
  },
  {
    id: "note-2",
    title: "Summer Vacation Ideas",
    content:
      "<p>Potential destinations for summer vacation:</p><ul><li>Greece - Santorini and Athens</li><li>Japan - Tokyo and Kyoto</li><li>Italy - Rome, Florence, and Venice</li></ul><p>Budget: $3,000 - $5,000</p><p>Best time to visit: July-August</p>",
    category: "personal",
    tags: ["travel", "vacation", "summer"],
    createdAt: "2023-05-20T09:15:00Z",
    updatedAt: "2023-05-25T11:45:00Z",
    pinned: false,
    views: 15,
    isPublic: false,
  },
  {
    id: "note-3",
    title: "Mobile App Concept",
    content:
      "<p>App idea: Fitness tracker with social features</p><p>Key features:</p><ul><li>Workout tracking</li><li>Progress visualization</li><li>Friend challenges</li><li>Integration with wearables</li></ul><p>Target audience: 25-40 year olds interested in fitness</p>",
    category: "ideas",
    tags: ["app", "fitness", "startup"],
    createdAt: "2023-05-15T16:20:00Z",
    updatedAt: "2023-05-18T10:10:00Z",
    pinned: true,
    views: 28,
    isPublic: true,
  },
  {
    id: "note-4",
    title: "Website Redesign Project",
    content:
      "<p>Timeline for website redesign:</p><ul><li>Research and planning: 2 weeks</li><li>Wireframing: 1 week</li><li>Design: 2 weeks</li><li>Development: 4 weeks</li><li>Testing: 1 week</li><li>Launch: June 30</li></ul>",
    category: "projects",
    tags: ["web", "design", "development"],
    createdAt: "2023-05-10T13:45:00Z",
    updatedAt: "2023-05-12T09:30:00Z",
    pinned: false,
    views: 34,
    isPublic: false,
  },
  {
    id: "note-5",
    title: "Book Recommendations",
    content:
      "<p>Books to read this year:</p><ul><li>Atomic Habits by James Clear</li><li>Deep Work by Cal Newport</li><li>The Psychology of Money by Morgan Housel</li><li>Project Hail Mary by Andy Weir</li></ul>",
    category: "personal",
    tags: ["books", "reading", "self-improvement"],
    createdAt: "2023-05-05T20:15:00Z",
    updatedAt: "2023-05-07T18:30:00Z",
    pinned: false,
    views: 19,
    isPublic: true,
  },
  {
    id: "note-6",
    title: "Quarterly Business Goals",
    content:
      "<p>Q3 Goals:</p><ul><li>Increase revenue by 15%</li><li>Launch new product line</li><li>Hire 2 new developers</li><li>Expand to European market</li></ul><p>Key metrics to track: MRR, CAC, LTV</p>",
    category: "business",
    tags: ["goals", "planning", "quarterly"],
    createdAt: "2023-06-02T11:20:00Z",
    updatedAt: "2023-06-03T14:10:00Z",
    pinned: true,
    views: 37,
    isPublic: false,
  },
  {
    id: "note-7",
    title: "Home Renovation Ideas",
    content:
      "<p>Kitchen renovation:</p><ul><li>New countertops - quartz or granite</li><li>Replace cabinet doors</li><li>Add kitchen island</li><li>New lighting fixtures</li></ul><p>Estimated budget: $15,000 - $20,000</p>",
    category: "personal",
    tags: ["home", "renovation", "kitchen"],
    createdAt: "2023-05-25T15:40:00Z",
    updatedAt: "2023-05-26T10:20:00Z",
    pinned: false,
    views: 12,
    isPublic: false,
  },
  {
    id: "note-8",
    title: "AI Product Ideas",
    content:
      "<p>Potential AI products to develop:</p><ul><li>Content generation tool for marketers</li><li>AI-powered customer service chatbot</li><li>Predictive analytics for e-commerce</li><li>Personalized learning platform</li></ul><p>Market size: $15B by 2025</p>",
    category: "ideas",
    tags: ["ai", "product", "innovation"],
    createdAt: "2023-05-18T09:30:00Z",
    updatedAt: "2023-05-20T16:15:00Z",
    pinned: true,
    views: 45,
    isPublic: true,
  },
]

export const communityNotes = [
  {
    id: "community-1",
    title: "How I Built a Profitable Side Project in 30 Days",
    content:
      "<p>My journey building a SaaS product in just one month:</p><ul><li>Week 1: Market research and validation</li><li>Week 2: MVP development</li><li>Week 3: Beta testing and feedback</li><li>Week 4: Launch and first customers</li></ul><p>Revenue in first month: $1,200</p>",
    author: {
      id: "user-1",
      name: "Alex Johnson",
      avatar: "/placeholder-user.jpg",
    },
    category: "business",
    tags: ["startup", "saas", "entrepreneurship"],
    createdAt: "2023-05-15T10:30:00Z",
    likes: 128,
    comments: 24,
    views: 1542,
  },
  {
    id: "community-2",
    title: "My Productivity System: How I Manage 50+ Projects",
    content:
      "<p>My productivity stack:</p><ul><li>Task management: Notion</li><li>Calendar: Google Calendar with time blocking</li><li>Notes: Obsidian with Zettelkasten method</li><li>Focus: Pomodoro technique (25/5)</li></ul><p>Key principle: Review weekly, plan daily</p>",
    author: {
      id: "user-2",
      name: "Sarah Miller",
      avatar: "/placeholder-user.jpg",
    },
    category: "personal",
    tags: ["productivity", "organization", "time-management"],
    createdAt: "2023-05-20T14:15:00Z",
    likes: 95,
    comments: 18,
    views: 1205,
  },
  {
    id: "community-3",
    title: "The Future of Remote Work: Trends for 2023",
    content:
      "<p>Key remote work trends:</p><ul><li>Hybrid models becoming standard</li><li>Asynchronous communication tools on the rise</li><li>Virtual reality workspaces gaining traction</li><li>Four-day workweek experiments expanding</li></ul><p>Companies leading the way: Gitlab, Shopify, Airbnb</p>",
    author: {
      id: "user-3",
      name: "Michael Chen",
      avatar: "/placeholder-user.jpg",
    },
    category: "business",
    tags: ["remote-work", "future-of-work", "trends"],
    createdAt: "2023-06-01T09:45:00Z",
    likes: 156,
    comments: 32,
    views: 2103,
  },
]
