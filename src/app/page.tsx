"use client"

import { EVEN_COURSE_LABEL, ODD_COURSE_LABEL } from "@/utils/const"
import { Button } from "@heroui/button"
import { Input } from "@heroui/input"
import { Select, SelectItem } from "@heroui/select"
import { useRouter } from "next/navigation"
import { FormEvent, useEffect, useState } from "react"

type ErrorState = { course?: string, batch?: string }
type FormState = { course: string, batch: string }

const empty: FormState = { course: "", batch: "" }

export default function Home() {

  const router = useRouter()
  const courseList = process.env.NEXT_PUBLIC_EVEN_SEM === "true" ? EVEN_COURSE_LABEL : ODD_COURSE_LABEL

  const [value, setValue] = useState<FormState>(empty)
  const [error, setError] = useState<ErrorState>({})

  useEffect(() => {
    setValue({
      course: localStorage.getItem("course") ?? "",
      batch: localStorage.getItem("batch") ?? ""
    })
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!value.course)
      return setError({ course: "Please select your course" })
    if (!value.batch)
      return setError({ batch: "Please enter batch details" })

    setError({})

    const cleanBatch = value.batch.replace(/[\s-]/g, "").toUpperCase()

    localStorage.setItem("course", value.course)
    localStorage.setItem("batch", value.batch)

    router.push(`/timetable?course=${encodeURIComponent(value.course)}&batch=${encodeURIComponent(cleanBatch)}`)
  }

  return (

    <form
      onSubmit={handleSubmit}
      className="mx-auto flex h-dvh max-w-7xl flex-col items-center gap-8 pt-32 max-md:px-4"
    >
      <div className="text-center">
        <h2 className="text-2xl font-semibold tracking-tight">
          View Your Timetable
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Select your course and batch to continue
        </p>
      </div>
      <Select
        label="Course"
        placeholder="Select your course"
        selectedKeys={value.course ? [value.course] : []}
        onSelectionChange={(keys) =>
          setValue((v) => ({ ...v, course: [...keys][0] as string }))
        }
        description={error.course}
        classNames={{ description: "text-red-400" }}
        className="max-w-md"
      >
        {courseList.map((c) => (
          <SelectItem key={c}>{c}</SelectItem>
        ))}
      </Select>

      <Input
        label="Batch"
        placeholder="Eg: 23A13, 24A11"
        value={value.batch}
        onValueChange={(batch) =>
          setValue((v) => ({ ...v, batch }))
        }
        description={error.batch}
        classNames={{ description: "text-red-400" }}
        className="max-w-md"
      />

      <Button type="submit" color="primary" radius="full">
        Get Timetable
      </Button>
    </form>
  )
}
