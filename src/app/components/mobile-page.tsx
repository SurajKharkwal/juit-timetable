import { Select, SelectItem } from "@nextui-org/select";
import { MobileData } from "../api/get-timetable/device";
import { daysFullName } from "@/lib/db/maps";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

function DisplayCard({ time, subject, teacher, hasClass, venue, batches, category }: MobileData) {
  return (
    <Card>
      <CardHeader className="font-bold">{time}</CardHeader>
      <CardBody className="pl-8">
        {
          hasClass ?
            <ol className="list-none text-green-500">
              <li className="flex">
                <strong className="flex-nowrap w-1/4">Subject :</strong>
                <p className="text-default-500">{subject}</p>
              </li>
              <li className="flex">
                <strong className="flex-nowrap w-1/4">Teacher :</strong>
                <p className="text-default-500">{teacher}</p>
              </li>
              <li className="flex">
                <strong className="flex-nowrap w-1/4">Batches :</strong>
                <p className="text-default-500">{batches}</p>
              </li>
              <li className="flex">
                <strong className="flex-nowrap w-1/4">Venue:</strong>
                <p className="text-default-500">{venue}</p>
              </li>
              <li className="flex">
                <strong className="flex-nowrap w-1/4">Category:</strong>
                <p className="text-default-500">{category}</p>
              </li>
            </ol>
            : <p className="text-danger">
              No class at {time}
            </p>
        }
      </CardBody>
    </Card>
  )
}

function SundaySpecial() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      No Class On Sunday
    </div>
  )
}

export default function MobileLayout({ timetable, setDay, day }: { timetable: MobileData[], setDay: (value: string) => void, day: string }) {
  return (
    <div className=" w-full flex-col flex items-center max-md:p-4 min-h-dvh space-y-4">
      <Select placeholder={day} radius="sm" size="lg" label="Select day" onChange={e => e.target.value ? setDay(e.target.value) : null} className="max-w-md px-4">
        {
          Object.values(daysFullName).map(ele => <SelectItem key={ele} value={ele}>{ele}</SelectItem>)
        }
      </Select>
      {
        day !== "Sunday" ?
          < section className="space-y-8 max-w-md  w-full">
            {timetable.map(ele => <DisplayCard key={ele.time} time={ele.time} subject={ele.subject} hasClass={ele.hasClass} teacher={ele.teacher} batches={ele.batches} venue={ele.venue} category={ele.category} />)}
          </section> : <SundaySpecial />
      }
    </div >
  )
}
