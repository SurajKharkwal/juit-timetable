import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { UserIcon, MapPinIcon, ClockIcon, CalendarHeartIcon, InfoIcon } from "lucide-react";

interface Props {
  isEmpty: boolean
  time: string,
  courseCode: string
  teacherCode: string
  venu: string
  classType: string
}

export function TimetableCard({
  isEmpty,
  time,
  courseCode,
  teacherCode,
  venu,
  classType
}: Props) {
  return (
    <section>
      <div className="text-xl text-muted-foreground font-mono py-4">
        <Button className="ml-auto text-xl" variant="light" radius="full" >{time}</Button>
      </div>

      {isEmpty ? <Card>
        <CardHeader className="text-neutral-300 space-x-2">
          <ClockIcon size={16} />
          <span> Free Time </span>
        </CardHeader>
      </Card> :
        <Card>
          <CardHeader>
            {courseCode}
          </CardHeader>
          <CardBody>
            <div className="flex items-center gap-2" >
              <UserIcon className="text-neutral-400" size={16} /> {teacherCode}
            </div>

            <div className="flex items-center gap-2" >
              <MapPinIcon className="text-neutral-400" size={16} /> {venu}
            </div>

            <div className="flex items-center gap-2" >
              <CalendarHeartIcon className="text-neutral-400" size={16} /> {classType}
            </div>
          </CardBody>
        </Card>}

    </section>
  )
}
