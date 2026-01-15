import { createFileRoute } from '@tanstack/react-router'
import { Select, SelectItem } from "@heroui/select"
import { EVEN_SEM, type CourseKey } from '@/utils/constants'
import { useEffect, useState } from 'react'
import { Input } from "@heroui/input"
import { Button } from '@heroui/button'
import { Alert } from '@heroui/alert'

export const Route = createFileRoute('/')({ component: App })

interface FormData { course: string, batch: string }
interface FormError { course?: string, batch?: string }

function App() {
  const navigate = Route.useNavigate()

  const [data, setData] = useState<FormData>({ course: '', batch: '' })
  const [error, setError] = useState<FormError>({})

  useEffect(() => {
    const course = localStorage.getItem("course")
    const batch = localStorage.getItem("batch")

    if (!course && !batch) return

    setData((prev) => ({
      course: course ?? prev.course,
      batch: batch ?? prev.batch,
    }))
  }, [])



  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const nextError: FormError = {}
    if (!data.course)
      nextError.course = 'Course is required'
    if (!data.batch.trim())
      nextError.batch = 'Batch is required'
    if (Object.keys(nextError).length > 0) {
      setError(nextError)
      return
    }
    localStorage.setItem("course", data.course)
    localStorage.setItem("batch", data.batch)
    navigate({
      to: '/timetable',
      search: {
        course: data.course as CourseKey,
        batch: data.batch,
      },
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=" w-full px-4 max-w-md bg-background flex flex-col gap-6 " >
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Find Your Timetable</h1>
        <p className="text-sm text-default-500 mt-1">
          Select your course and batch to continue
        </p>
      </div>

      <Select
        label="Course"
        placeholder="Select course"
        selectedKeys={data.course ? [data.course] : []}
        description={error.course}
        isInvalid={Boolean(error.course)}
        onSelectionChange={(keys) => {
          const value = Array.from(keys)[0] as string
          setData((prev) => ({ ...prev, course: value }))
          setError((prev) => ({ ...prev, course: undefined }))
        }}
      >
        {EVEN_SEM.map((course) => (
          <SelectItem key={course}>
            {course}
          </SelectItem>
        ))}
      </Select>

      <Input
        label="Batch"
        placeholder="Eg: 23A12, 24A11"
        value={data.batch}
        isInvalid={Boolean(error.batch)}
        errorMessage={error.batch}
        onChange={(e) =>
          setData((prev) => ({ ...prev, batch: e.target.value }))
        }
      />

      <Button
        type="submit"
        color="primary"
        radius="full"
        className='w-fit mx-auto'
      >
        Get Timetable
      </Button>

      <Alert
        title="Found a bug?"
        description="Please report it."
      />
    </form>
  )
}
