import { getInitialDay } from "@/utils"
import { TIMETABLE_FILE, type CourseKey } from "@/utils/constants"
import { useEffect, useState } from "react"

interface TimetableEntry {
  day: number
  time: number
  data: string[]
}

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useCompactTimetable(course: CourseKey) {
  const [state, setState] = useState<AsyncState<TimetableEntry[]>>({
    data: null,
    loading: false,
    error: null,
  })
  const [day, setDay] = useState(() => getInitialDay())

  useEffect(() => {
    if (!course) return

    const fileName = TIMETABLE_FILE[course]
    const url = `https://raw.githubusercontent.com/SurajKharkwal/juit-timetable/data/${fileName}`

    setState({
      data: null,
      loading: true,
      error: null,
    })

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch timetable")
        return res.json()
      })
      .then((json: TimetableEntry[]) => {
        setState({
          data: json.filter(ele => ele.day == day),
          loading: false,
          error: null,
        })
      })
      .catch((err) => {
        setState({
          data: null,
          loading: false,
          error: err.message ?? "Unknown error",
        })
      })
  }, [course, day])

  return {
    ...state, // data, loading, error
    day,
    setDay,
  }
}
