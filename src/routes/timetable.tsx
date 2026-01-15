import { useCompactTimetable } from '@/hooks/use-timetable'
import { CLASS_TIME, WEEK_DAYS, type CourseKey } from '@/utils/constants'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Button } from '@heroui/button';
import { CalendarDays, CalendarHeartIcon, CheckIcon, ClockIcon, MapPinIcon, UserIcon } from 'lucide-react';
import { extractTimetableEntries } from '@/utils';
import { Card, CardBody, CardHeader } from '@heroui/card';
import Loading from '@/components/loading';
import { addToast } from '@heroui/toast';
import { Listbox, ListboxItem } from "@heroui/listbox";


export const Route = createFileRoute('/timetable')({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      course: search.course as CourseKey,
      batch: search.batch as string,
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const params = Route.useSearch()
  const { data, error, loading, day, setDay } =
    useCompactTimetable(params.course)

  if (loading || !data)
    return <div className="h-dvh flex justify-center"><Loading /></div>
  if (error || data.length == 0) {
    addToast({
      title: "Toast Title",
      description: "Toast Description",
    });
    redirect({ to: "/" })
    return null
  }

  return (
    <div className="relative flex justify-around mx-auto gap-8 px-8 pb-16 w-full">
      <div className='max-w-xl w-full space-y-3'>
        {data.map((item, index) => {
          const entry = extractTimetableEntries(
            params.batch,
            item.data
          )

          return (
            <section key={index} className="space-y-3">
              <div className="text-xl text-muted-foreground font-mono">
                {CLASS_TIME[item.time]}
              </div>

              {!entry || entry.length === 0 ? (
                <Card>
                  <CardHeader className="flex items-center gap-2  text-neutral-500 dark:text-neutral-300">
                    <ClockIcon size={16} />
                    <span>Free Time</span>
                  </CardHeader>
                </Card>
              ) : (
                entry.map((ele, i) => (
                  <Card key={i}>
                    <CardHeader>{ele.courseCode}</CardHeader>
                    <CardBody className="space-y-2">
                      <div className="flex items-center gap-2">
                        <UserIcon size={16} className=" text-neutral-500 dark:text-neutral-300" />
                        {ele.teacherCode}
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPinIcon size={16} className=" text-neutral-500 dark:text-neutral-300" />
                        {ele.venue}
                      </div>

                      <div className="flex items-center gap-2">
                        <CalendarHeartIcon size={16} className=" text-neutral-500 dark:text-neutral-300" />
                        {ele.classType}
                      </div>
                    </CardBody>
                  </Card>
                ))
              )}
            </section>
          )
        })}
      </div>
      <div className="fixed md:hidden bottom-12 right-12 md:right-1/6 z-50">
        <Dropdown placement="top-end">
          <DropdownTrigger>
            <Button color='primary' isIconOnly radius="full" size="lg" variant="flat">
              <CalendarDays />
            </Button>
          </DropdownTrigger>

          <DropdownMenu
            aria-label="Select Day"
            onAction={(key) => setDay(Number(key))}
          >
            {WEEK_DAYS.map((label, index) => (
              index != day ?
                <DropdownItem key={index} >{label}</DropdownItem> :
                <DropdownItem key={index} endContent={<CheckIcon />} >{label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>
      <aside className="hidden md:block w-64 sticky top-24 self-start">
        <Listbox
          aria-label="Select Day"
          selectedKeys={[String(day)]}
          onAction={(key) => setDay(Number(key))}
        >
          {WEEK_DAYS.map((label, index) => (
            index != day ?
              <ListboxItem key={index}>
                {label}
              </ListboxItem> :
              <ListboxItem endContent={<CheckIcon />} key={index}>
                {label}
              </ListboxItem>



          ))}
        </Listbox>
      </aside>
    </div>
  )
}
