"use client"

import { DAYS } from "@/lib/conts"
import { useCompactTimetable } from "@/hooks/use-compact-timetable"
import { TimetableEntry } from "@/lib/types"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Select, SelectItem } from "@heroui/select"
import { extractTimetableEntry } from "@/lib/utils"

type TimetableCardProps = {
  data: string[]
  time: string
  batch: string
} & React.ComponentProps<typeof Card>

export function TimetableCard({
  data,
  time,
  batch,
  ...cardProps
}: TimetableCardProps) {
  const entry = extractTimetableEntry(batch, data)

  if (!entry) {
    return (
      <Card {...cardProps}>
        <CardHeader>{time}</CardHeader>
        <CardBody className="text-sm text-muted-foreground">
          No class scheduled
        </CardBody>
      </Card>
    )
  }

  const {
    courseCode,
    batches,
    coordinator,
    venue,
    classType,
  } = entry

  return (
    <Card {...cardProps}>
      <CardHeader>
        {time}
      </CardHeader>

      <CardBody className="space-y-1">
        <p>
          <strong>Course:</strong>{" "}
          <span className="capitalize">{courseCode}</span>
        </p>

        <p>
          <strong>Batches:</strong>{" "}
          <span>{batches}</span>
        </p>

        <p>
          <strong>Coordinator:</strong>{" "}
          <span>{coordinator}</span>
        </p>

        {venue && (
          <p>
            <strong>Venue:</strong>{" "}
            <span>{venue}</span>
          </p>
        )}
      </CardBody>
    </Card>
  )
}

export default function CompactTimetable({
  course,
  batch
}: {
  course: string
  batch: string
}) {
  const { state, day, setDay } = useCompactTimetable(course)

  if (state.status === "loading") return <div>Loading…</div>
  if (state.status === "error") return <div>Error loading timetable</div>


  return (
    <div className="p-4 space-y-4">
      <Select
        label="Select day"
        selectedKeys={[day]}
        onSelectionChange={(keys) =>
          setDay(Array.from(keys)[0] as string)
        }
      >
        {DAYS.map((d) => (
          <SelectItem key={d}>{d}</SelectItem>
        ))}
      </Select>
      {
        state.data.map((ele, index) => (
          <TimetableCard batch={batch} data={ele.data} time={ele.time} key={index} />
        ))
      }
    </div>
  )
}
