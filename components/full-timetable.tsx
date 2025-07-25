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
                    (item) => item.day === day && item.time === slot,
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
                          <CardHeader className="p-0 px-2 mt-2 mb-0">
                            {classInfo.courseCode}
                          </CardHeader>
                          <CardBody>
                            <div className="text-foreground/50">
                              {classInfo.type}
                            </div>
                            <div>{classInfo.venue}</div>
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
