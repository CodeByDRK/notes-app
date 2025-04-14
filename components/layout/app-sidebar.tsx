"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Sidebar, SidebarContent, SidebarHeader, SidebarFooter, SidebarRail } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Edit3,
  Search,
  Users,
  User,
  Settings,
  Plus,
  Sparkles,
  Lightbulb,
  BookMarked,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { QuickNoteDialog } from "@/components/notes/quick-note-dialog"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  color?: string
}

export function AppSidebar() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<{ setOpen: (open: boolean) => void }>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  const mainNavItems: NavItem[] = [
    {
      title: "Desk",
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
      color: "text-purple-500",
    },
    {
      title: "Vault",
      href: "/vault",
      icon: <Search className="h-5 w-5" />,
      color: "text-amber-500",
    },
    {
      title: "Community",
      href: "/community",
      icon: <Users className="h-5 w-5" />,
      color: "text-green-500",
    },
  ]

  const userNavItems: NavItem[] = [
    {
      title: "Profile",
      href: "/profile",
      icon: <User className="h-5 w-5" />,
    },
  ]

  const openQuickNoteDialog = () => {
    dialogRef.current?.setOpen(true)
  }

  if (!mounted) {
    return null
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-3 py-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Lightbulb className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold">Ideaflow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <div className="flex flex-col gap-2">
          <Button 
            variant="default" 
            className="w-full justify-start gap-2 group transition-all"
            onClick={openQuickNoteDialog}
          >
            <Plus className="h-5 w-5 group-hover:rotate-90 transition-transform duration-200" />
            <span>New Note</span>
          </Button>

          <Separator className="my-2" />

          <div className="px-3 py-1">
            <h3 className="text-xs font-medium text-muted-foreground">MAIN</h3>
          </div>
          <ScrollArea className="h-[calc(100vh-13rem)]">
            <div className="space-y-1 px-1">
              {mainNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start gap-2 transition-all",
                    pathname === item.href && "font-medium",
                    item.color,
                  )}
                  asChild
                >
                  <Link href={item.href} className="slide-in-from-left">
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>

            <Separator className="my-2" />

            <div className="px-3 py-1">
              <h3 className="text-xs font-medium text-muted-foreground">CATEGORIES</h3>
            </div>
            <div className="space-y-1 px-1">
              <Button variant="ghost" className="w-full justify-start gap-2 text-blue-500" asChild>
                <Link href="/category/business">
                  <BookMarked className="h-5 w-5" />
                  <span>Business</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-green-500" asChild>
                <Link href="/category/personal">
                  <BookMarked className="h-5 w-5" />
                  <span>Personal</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-amber-500" asChild>
                <Link href="/category/ideas">
                  <BookMarked className="h-5 w-5" />
                  <span>Ideas</span>
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2 text-purple-500" asChild>
                <Link href="/category/projects">
                  <BookMarked className="h-5 w-5" />
                  <span>Projects</span>
                </Link>
              </Button>
            </div>

            <Separator className="my-2" />

            <div className="px-3 py-1">
              <h3 className="text-xs font-medium text-muted-foreground">USER</h3>
            </div>
            <div className="space-y-1 px-1">
              {userNavItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("w-full justify-start gap-2", pathname === item.href && "font-medium")}
                  asChild
                >
                  <Link href={item.href}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SidebarContent>
      <SidebarFooter className="mt-auto p-2 border-t">
        <div className="flex items-center gap-2 p-2">
          <Avatar>
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm font-medium">John Doe</span>
            <span className="text-xs text-muted-foreground">Free Plan</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
      <QuickNoteDialog ref={dialogRef} />
    </Sidebar>
  )
}
