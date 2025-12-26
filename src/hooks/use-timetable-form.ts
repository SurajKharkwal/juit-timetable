import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

type Query = {
  course: string
  batch: string
}

type Errors = Partial<Query>

const EMPTY: Query = { course: "", batch: "" }

export function useTimetableForm() {
  const router = useRouter()

  const [value, setValue] = useState<Query>(EMPTY)
  const [error, setError] = useState<Errors>({})

  // Prefill only (localStorage is NOT source of truth)
  useEffect(() => {
    const course = localStorage.getItem("course")
    const batch = localStorage.getItem("batch")

    if (course || batch) {
      setValue({
        course: course ?? "",
        batch: batch ?? "",
      })
    }
  }, [])

  function normalizeBatch(input: string) {
    return input.replace(/[\s-]/g, "").toUpperCase()
  }

  function validate(v: Query): Errors {
    const e: Errors = {}
    if (!v.course) e.course = "Course is required"
    if (!v.batch) e.batch = "Batch is required"
    return e
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const next = {
      course: value.course,
      batch: normalizeBatch(value.batch),
    }

    const errors = validate(next)
    if (Object.keys(errors).length > 0) {
      setError(errors)
      return
    }

    setError({})

    localStorage.setItem("course", next.course)
    localStorage.setItem("batch", next.batch)

    router.push(
      `/timetable?course=${encodeURIComponent(next.course)}&batch=${encodeURIComponent(next.batch)}`
    )
  }

  return {
    value,
    setValue,
    error,
    handleSubmit,
  }
}
