import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { extractTimetableEntry } from "@/utils";
import { DAYS, TIMES } from "@/utils/const";
import { useFullTimetable } from "@/hooks/use-full-data";

export function FullTimetable() {
  const { state, batch } = useFullTimetable();

  if (state.status === "loading") return <div>Loading...</div>;
  if (state.status === "error") return <div>Error occurred</div>;

  return (
    <div className="w-full min-h-dvh flex items-center justify-center">
      <Table aria-label="Weekly Timetable" className="max-w-7xl">
        <TableHeader>
          <>
            <TableColumn>Time</TableColumn>
            {DAYS.map(day => (
              <TableColumn key={day}>{day}</TableColumn>
            ))}
          </>
        </TableHeader>
        <TableBody>
          {TIMES.map((slot) => (
            <TableRow key={slot}>
              {[
                <TableCell key="time" className="font-semibold">
                  {slot}
                </TableCell>,
                ...DAYS.map((day) => {
                  const entry = state.data.find(
                    (item) => item.day === day && item.time === slot,
                  );
                  const classInfo = entry?.data
                    ? extractTimetableEntry(batch, entry.data)
                    : null;
                  return (
                    <TableCell key={`${slot}-${day}`}>
                      {classInfo ? (
                        <Card
                          shadow="lg"
                          className="hover:scale-110"
                        >
                          <CardHeader className="flex justify-between items-center p-0 px-2 mt-2 mb-0">
                            <span>{classInfo.courseCode}</span>
                            <span>
                              {classInfo.coordinator}
                            </span>
                          </CardHeader>
                          <CardBody className="p-2">
                            <div className="flex justify-between items-end">
                              <div>
                                <div>
                                  {classInfo.classType}
                                </div>
                                <div>{classInfo.venue}</div>
                              </div>
                              {classInfo.floor && (
                                <div>
                                  {classInfo.floor}
                                </div>
                              )}
                            </div>
                          </CardBody>
                        </Card>
                      ) : (
                        <span className="text-gray-400 dark:text-neutral-500">
                          —
                        </span>
                      )}
                    </TableCell>
                  );
                }),
              ]}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
