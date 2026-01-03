"use client"
import { useIsMobile } from "@/hooks/use-mobile";
import { CompactTimetable } from "./compact-timetable";
import { FullTimetable } from "./full-timetable";

export default function Timetable() {
  const isMobile = useIsMobile()


  if (isMobile)
    return <CompactTimetable />
  return <FullTimetable />
}
