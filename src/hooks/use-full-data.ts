import { getCourseData } from "@/db/server"
import { MongoEntry } from "@/types"
import { addToast } from "@heroui/toast"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

type State =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: MongoEntry[] }


export function useFullTimetable() {
  const router = useRouter()
  const sp = useSearchParams()

  const [state, setState] = useState<State>({
    status: "loading",
  })
  const [ batch, setBatch] = useState("")

  useEffect(() => {
    const course = sp.get("course")
    const batch = sp.get("batch")

    if (!course || !batch) {

      addToast({
        title: "Missing Information",
        description: "Can not find the course or batch, Please try agian",
        onClose: () => router.push("/")
      });

      router.push("/")

      return;
    }

    setBatch(batch)
    let cancelled = false;
    (async () => {
      try {
        setState({ status: "loading" })

        const data = await getCourseData(course) as any[]
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
  }, [])
  return { state , batch}
}
