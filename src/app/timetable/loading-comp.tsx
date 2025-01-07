"use client"
import { Skeleton } from "@nextui-org/skeleton";
import { Spinner } from "@nextui-org/spinner";

export function DesktopLoading() {
  return (
    <div className="w-full text-xl h-dvh flex gap-4 items-center justify-center">
      <Spinner />
      Loading ...
    </div>
  )
}
export function MobileLoading() {
  return (
    <div className="w-full min-h-dvh flex flex-col items-center gap-8 justify-center p-4">
      <Skeleton className="max-w-sm w-full h-12 rounded-lg" />
      <Skeleton className="max-w-sm w-full h-[200px] rounded-lg" />
      <Skeleton className="max-w-sm w-full h-[200px] rounded-lg" />
      <Skeleton className="max-w-sm w-full h-[200px] rounded-lg" />
      <Skeleton className="max-w-sm w-full h-[200px] rounded-lg" />
      <Skeleton className="max-w-sm w-full h-[200px] rounded-lg" />
    </div>
  )
}
