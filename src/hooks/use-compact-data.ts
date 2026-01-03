import { getCourseData } from "@/db/server";
import { parseStartMinutes } from "@/utils";
import { DAYS } from "@/utils/const";
import { addToast } from "@heroui/toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

type State<T> =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "ready"; data: T }

export function useCompactData() {
  const sp = useSearchParams()
  const router = useRouter()
  const [ batch, setBatch] = useState("")
  const [state, setState] = useState<State<any[]>>({
    status: "loading",
  })
  const [day, setDay] = useState(() => {
    const now = new Date()
    let dayIndex = now.getDay() // 0 = Sunday
    const hour = now.getHours()

    // after 6 PM → next day
    if (hour >= 18) dayIndex += 1

    dayIndex %= 7

    // skip Sunday
    if (dayIndex === 0) dayIndex = 1

    return DAYS[--dayIndex] // look the days array u will get it 
  })

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

        // TODO : use proper data type 
        const data = await getCourseData(course)
        const newData = data.filter(ele => ele.day === day.toUpperCase()).sort((a, b) => parseStartMinutes(a.time) - parseStartMinutes(b.time))
        console.log(newData)

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
  }, [day])

  return { state, day, setDay, batch }
}
