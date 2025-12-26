import { getCourseData } from "@/db/actions";
import { parseStartMinutes } from "@/lib/utils";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

type State<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: T }

export function useCompactTimetable(course: string) {
  const router = useRouter()
  const [state, setState] = useState<State<any[]>>({
    status: "loading",
  })
  const [day, setDay] = useState(() => {
    return new Date().toLocaleDateString("en-US", { weekday: "long" })
  })

  useEffect(() => {
    if (!course) return

    let cancelled = false;

    (async () => {
      try {
        setState({ status: "loading" })

        // TODO : use proper data type 
        const data = await getCourseData(course)
        const newData = data.filter(ele => ele.day === day.toUpperCase()).sort((a, b) => parseStartMinutes(a.time) - parseStartMinutes(b.time))

        if (!cancelled) {
          setState({ status: "ready", data: newData })
        }
      } catch (e) {
        console.log(e)
        if (!cancelled) {
          setState({
            status: "error",
            error: "Failed to load timetable",
          })
          addToast({
            title: "Error Occured",
            description: "Failed to fetch the timetable",
            onClose: () => router.push("/")
          });
        }
      }
    })()

    return () => {
      cancelled = true
    }
  }, [course, day])

  return { state, day, setDay }
}
