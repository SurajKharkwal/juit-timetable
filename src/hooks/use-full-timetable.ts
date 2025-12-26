import { getCourseData } from "@/db/actions"
import { Day, MongoEntry, Time } from "@/lib/types"
import { addToast } from "@heroui/toast"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type State =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: MongoEntry[] }


export function useFullTimetable(course: string) {
  const router = useRouter()

  const [state, setState] = useState<State>({
    status: "loading",
  })

  useEffect(() => {
    if (!course) return

    let cancelled = false;
    (async () => {
      try {
        setState({ status: "loading" })

        const data = await getCourseData(course)
        if (cancelled) return

        setState({
          status: "ready",
          data
        })
      } catch {
        if (cancelled) return
        setState({ status: "error", error: "Failed to load timetable" })
        addToast({
          title: "Error occurred",
          description: "Failed to fetch the timetable",
          onClose: () => router.push("/"),
        })
      }
    })()

    return () => { cancelled = true }
  }, [course, router])
  return state
}

