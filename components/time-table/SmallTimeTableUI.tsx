import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export default function SmallTimeTableUI({ rows }: { rows: any }) {
  const cellValue: any[] = Object.values(rows[0]);
  cellValue.splice(0, 2);
  console.log(cellValue);
  const columns = [
    {
      key: "at9",
      label: "9:00-10:00",
    },
    {
      key: "at10",
      label: "10:00-11:00",
    },
    {
      key: "at11",
      label: "11:00-12:00",
    },
    {
      key: "at12",
      label: "12:00-1:00",
    },
    {
      key: "at1",
      label: "1:00-2:00",
    },
    {
      key: "at2",
      label: "2:00-3:00",
    },
    {
      key: "at3",
      label: "3:00-4:00",
    },
    {
      key: "at4",
      label: "4:00-5:00",
    },
    {
      key: "at5",
      label: "5:00-6:00",
    },
  ];

  return (
    <div className="min-h-screen h-full flex items-center justify-center w-full">
      <Table
        className="w-full"
        radius="sm"
        aria-label="Example table with dynamic content"
      >
        <TableHeader className=" w-full h-full">
          <TableColumn className="text-xl text-blue-400 p-3 font-extrabold gap-2">
            Time
          </TableColumn>
          <TableColumn className="text-xl text-blue-400 p-3  font-extrabold gap-2">
            Class
          </TableColumn>
        </TableHeader>
        <TableBody className="w-full h-full">
          {columns.map((col, index) => (
            <TableRow key={col.key}>
              <TableCell className="text-xl border-2 w-32 border-neutral-800  sm:p-4">
                {col.label}
              </TableCell>
              <TableCell className="text-xl border-2 border-neutral-800 p-2 sm:p-4">
                {cellValue[index]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
