import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";

export default function TimeTableUI({ rows }: { rows: any }) {
  console.log(rows);
  const columns = [
    {
      key: "day",
      label: "DAY",
    },
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
    <div className="min-h-screen h-full flex items-center justify-center max-w-[1920px] w-full">
      <Table className="w-full" aria-label="Example table with dynamic content">
        <TableHeader className=" w-full h-full">
          {columns.map((column) => (
            <TableColumn
              className="text-xl text-blue-400 p-6  font-extrabold gap-2"
              key={column.key}
            >
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody className="w-full h-full">
          {rows.map((row: any) => (
            <TableRow key={row.key}>
              {(columnKey) => (
                <TableCell className="text-xl rounded-md border-1 w-[232.42] border-blue-400/20 p-4 pb-4 cursor-pointer items-center justify-center">
                  {getKeyValue(row, columnKey)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
