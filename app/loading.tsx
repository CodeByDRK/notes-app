import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-10 w-[250px]" />
        <Skeleton className="h-5 w-[350px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Skeleton className="h-[200px] md:col-span-2 lg:col-span-2" />
        <Skeleton className="h-[200px]" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-6 md:col-span-2">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-8 w-[150px]" />
              <Skeleton className="h-8 w-[100px]" />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Skeleton className="h-[180px]" />
              <Skeleton className="h-[180px]" />
              <Skeleton className="h-[180px]" />
              <Skeleton className="h-[180px]" />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Skeleton className="h-[250px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    </div>
  )
}
