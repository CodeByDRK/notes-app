import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <div>
          <Skeleton className="h-10 w-[200px]" />
          <Skeleton className="h-5 w-[300px] mt-1" />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Skeleton className="h-10 flex-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-[160px]" />
            <Skeleton className="h-10 w-10" />
            <Skeleton className="h-10 w-20 hidden sm:block" />
          </div>
        </div>
      </div>

      <Skeleton className="h-[1px] w-full" />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    </div>
  )
}
