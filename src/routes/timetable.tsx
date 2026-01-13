import { TimetableCard } from '@/components/custom-card'
import { useCompactTimetable } from '@/hooks/use-timetable'
import { WEEK_DAYS, type CourseKey } from '@/utils/constants'
import { createFileRoute } from '@tanstack/react-router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from '@heroui/button';
import { Calendar } from 'lucide-react';
import { extractTimetableEntries } from '@/utils';


export const Route = createFileRoute('/timetable')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      course: search.course as CourseKey,
      batch: search.batch as string,
    }
  },
  component: RouteComponent,
})

const testTimetable = [
  {
    isEmpty: false,
    time: "10:00 AM",
    courseCode: "18BTCI672",
    teacherCode: "Dr. Pardeep Kumar",
    venu: "CL3.2",
    classType: "Lecture"
  },
  {
    isEmpty: true,
    time: "11:00 AM",
    courseCode: "",
    teacherCode: "",
    venu: "",
    classType: "Lecture"
  },
  {
    isEmpty: false,
    time: "02:00 PM",
    courseCode: "18BTCI611",
    teacherCode: "Dr. Hari Singh",
    venu: "CR9/DLC",
    classType: "Lecture"
  },
]

function RouteComponent() {
  const params = Route.useSearch()
  const { data, error, loading, day, setDay } = useCompactTimetable(params.course)

  if (loading)
    return <div className="text-default-500">Loading timetable…</div>
  if (error)
    return <div className="text-danger">{error}</div>
  if (!data) return null

  return <div className="relative flex flex-col mx-auto gap-8 px-8 pt-20 max-w-3xl">
    <div className="fixed bottom-6 right-6 md:right-1/6 z-50">
      <Dropdown placement="top-end">
        <DropdownTrigger>
          <Button
            isIconOnly
            radius="full"
            size="lg"
            variant="shadow"
          >
            <Calendar />
          </Button>
        </DropdownTrigger>

        <DropdownMenu
          aria-label="Select Day"
          selectedKeys={[String(day)]}
          onAction={(key) => setDay(Number(key))}
        >
          {WEEK_DAYS.map((label, index) => (
            <DropdownItem key={index}>
              {label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>

    {data.map((item, index) => {

      const entry = extractTimetableEntries(params.batch, item.data);

      return <TimetableCard
        key={index}
        isEmpty={item.isEmpty}
        time={item.time}
        courseCode={entry.courseCode}
        teacherCode={item.teacherCode}
        venu={item.venu}
        classType={item.classType}
      />
    )}
  </div>
}
