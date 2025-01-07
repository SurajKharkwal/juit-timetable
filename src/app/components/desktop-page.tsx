
import { TimeMapper } from "@/lib/db/maps";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { DesktopData } from "../api/get-timetable/device";

export default function DesktopPage({ timetable }: { timetable: DesktopData[] }) {
  const timeArr = Object.values(TimeMapper);
  console.log(timetable)

  return (
    <div className="flex p-4 min-h-dvh w-full items-center justify-center">
      <Table aria-label="timetable">
        <TableHeader>
          {
            Array.from({ length: timeArr.length + 1 }).map((_, i) => {
              if (i === 0) return <TableColumn className="text-xl" key={`header-${i}`}>Days</TableColumn>;
              return (
                <TableColumn className="text-blue-200 text-xl" key={`header-${i}`}>
                  {timeArr[i - 1]}
                </TableColumn>
              );
            })
          }
        </TableHeader>
        <TableBody>
          {
            timetable.map((element, i) => (
              <TableRow key={`row-${i}`}>
                {
                  Array.from({ length: timeArr.length + 1 }).map((_, j) => {
                    if (j === 0) return <TableCell key={`cell-${i}-${j}`} className="text-2xl text-blue-200 rounded-lg font-bold border border-neutral-700">{element.day}</TableCell>
                    return (
                      <TableCell key={`cell-${i}-${j}`} className="text-2xl border border-neutral-700 rounded-lg p-4">
                        {element.items[j - 1]?.data || ""}
                      </TableCell>
                    )
                  })
                }
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  );
}
