import { useCompactTimetable } from "@/hooks/use-timetable"
import { type CourseKey } from "@/utils/constants"
import { TimetableCard } from "./custom-card"

type Props = {
  course: CourseKey
  batch: string
}

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

export function CompactTimetable({ course, batch }: Props) {
  const { data, error, loading } = useCompactTimetable(course)

  if (loading)
    return <div className="text-default-500">Loading timetable…</div>
  if (error)
    return <div className="text-danger">{error}</div>
  if (!data) return null

  return (
    <div className="relative flex flex-col gap-8 px-8 pt-20">
      {testTimetable.map((item, index) => (
        <TimetableCard
          key={index}
          isEmpty={item.isEmpty}
          time={item.time}
          courseCode={item.courseCode}
          teacherCode={item.teacherCode}
          venu={item.venu}
          classType={item.classType}
        />
      ))}
    </div>
  )
}

