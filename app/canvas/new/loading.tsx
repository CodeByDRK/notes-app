import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex h-[calc(100vh-0px)] overflow-hidden">
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between border-b p-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-6 w-[1px]" />
            <Skeleton className="h-8 w-[130px]" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-9 w-[80px]" />
          </div>
        </header>
        <div className="flex flex-col flex-1 overflow-auto p-4">
          <Skeleton className="h-10 w-[300px] mb-4" />
          <Skeleton className="h-8 w-full mb-4" />
          <Skeleton className="h-8 w-[200px] mb-6" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
      <Skeleton className="border-l w-[300px]" />
    </div>
  )
}
