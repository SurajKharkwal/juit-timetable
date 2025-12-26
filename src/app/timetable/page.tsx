"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { addToast } from "@heroui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import CompactTimetable from "./compact-timetable";
import { ExpandedTimetable } from "./full-timetable";

export default function Timetable() {
  const router = useRouter();
  const isMobile = useIsMobile()
  const searchparams = useSearchParams()

  const course = searchparams.get("course")
  const batch = searchparams.get("batch")

  if (!course || !batch) {
    addToast({
      title: "Missing information",
      description: "Please select both course and batch",
      onClose: () => router.push("/")
    });
    return;
  }
  if (isMobile)
    return <CompactTimetable course={course} batch={batch} />
  return <ExpandedTimetable course={course} batch={batch} />
}
