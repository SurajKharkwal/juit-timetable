import { Day, Time } from "@/types"
import { DAYS } from "@/utils/const"
import { Card, CardBody, CardHeader } from "@heroui/card"
import { Select, SelectItem } from "@heroui/select"
import { useCompactData } from "@/hooks/use-compact-data"
import { extractTimetableEntry } from "@/utils"

function CustomCard({
  time,
  batch,
  data,
  ...props
}: {
  time: Time
  batch: string
  data: string[]
}) {
  const entry = extractTimetableEntry(batch, data)

  if (!entry) {
    return (
      <Card className="max-w-md w-full" {...props}>
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
    floor
  } = entry

  return (
    <Card className="max-w-md w-full" {...props}>
      <CardHeader className="flex items-center justify-between px-4">
        <span className="text-lg font-semibold text-muted-foreground">
          {time}
        </span>

        <span className="rounded-full bg-muted px-2 text-xs font-medium">
          {classType}
        </span>
      </CardHeader>

      <CardBody className="space-y-1">
        <p>
          <strong>Course:</strong>
          <span className="capitalize">{courseCode}</span>
        </p>

        <p>
          <strong>Batches:</strong>
          <span>{batches}</span>
        </p>

        <p>
          <strong>Coordinator:</strong>
          <span>{coordinator}</span>
        </p>

        {venue && (
          <p>
            <strong>Venue:</strong>
            <span>{venue} ({floor}) </span>
          </p>
        )}
      </CardBody>
    </Card>
  )
}

export function CompactTimetable() {

  const { state, day, batch, setDay } = useCompactData()


  if (state.status === "loading") return <div>Loading…</div>
  if (state.status === "error") return <div>Error loading timetable</div>

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center gap-8 pt-20 max-md:px-4" >
      <Select
        label="Select day"
        selectedKeys={[day]}
        onSelectionChange={(keys) =>
          setDay(Array.from(keys)[0] as Day)
        }
      >
        {DAYS.map((d) => (
          <SelectItem key={d}>{d}</SelectItem>
        ))}
      </Select>

      {state.data.map(ele => <CustomCard key={ele.day + ele.time} time={ele.time} data={ele.data} batch={batch} />)}
    </div>
  )
}
