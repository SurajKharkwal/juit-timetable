import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { Days, TimeSlots } from "@/config/data";
import { findClassForBatch, toDisclude } from "@/lib/utils";
import { DATA } from "@/types";

type FullTimetableTableProps = {
  course: string;
  batch: string;
  minor: string | null;
  data: DATA[];
};

export function FullTimetableTable({
  course,
  batch,
  minor,
  data,
}: FullTimetableTableProps) {
  const columns = ["TIME", ...Days];

  return (
    <div className="overflow-auto">
      <Table aria-label="Weekly Timetable">
        <TableHeader>
          {columns.map((col) => (
            <TableColumn key={col}>{col}</TableColumn>
          ))}
        </TableHeader>

        <TableBody>
          {TimeSlots.map((slot) => (
            <TableRow key={slot}>
              {[
                <TableCell key="time" className="font-semibold">
                  {slot}
                </TableCell>,
                ...Days.map((day) => {
                  const entry = data.find(
                    (item) => item.day === day && item.time === slot
                  );

                  const toSkip = minor ? toDisclude(course, minor) : [];
                  const classInfo = entry?.data
                    ? findClassForBatch(batch, entry.data, toSkip)
                    : null;

                  return (
                    <TableCell key={`${slot}-${day}`}>
                      {classInfo ? (
                        <Card
                          shadow="lg"
                          className="hover:scale-110 cursor-crosshair"
                        >
                          <CardHeader className="flex justify-between items-center p-0 px-2 mt-2 mb-0">
                            <span>{classInfo.courseCode}</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {classInfo.coordinator}
                            </span>
                          </CardHeader>
                          <CardBody className="p-2">
                            <div className="flex justify-between items-end">
                              <div>
                                <div className="text-gray-500 dark:text-gray-400">
                                  {classInfo.type}
                                </div>
                                <div>{classInfo.venue}</div>
                              </div>
                              {classInfo.floor && (
                                <div className="text-xs text-gray-400 dark:text-gray-500">
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
