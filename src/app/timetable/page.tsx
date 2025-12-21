"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Timetable() {
  const router = useRouter();
  const isMobile = useIsMobile()
  const [data, setData] = useState()
  useEffect(() => {
    const course = localStorage.getItem("course");
    const batch = localStorage.getItem("batch");

    if (!course || !batch) {
      addToast({
        title: "Missing information",
        description: "Please select both course and batch",
      });
      router.push("/");
      return;
    }
  }, [router]);


  if (isMobile)
    return <CompactTimetable data={data} />
  return <ExpandedTimetable data={data} />
}
