"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Key, useState } from "react";

const columns = [
  { key: "at9", label: "9:00-10:00" },
  { key: "at10", label: "10:00-11:00" },
  { key: "at11", label: "11:00-12:00" },
  { key: "at12", label: "12:00-1:00" },
  { key: "at1", label: "1:00-2:00" },
  { key: "at2", label: "2:00-3:00" },
  { key: "at3", label: "3:00-4:00" },
  { key: "at4", label: "4:00-5:00" },
  { key: "at5", label: "5:00-6:00" },
];

const daysList = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export default function SmallTimeTableUI({ rows }: { rows: any }) {
  const [selectedDay, setSelectedDay] = useState<Key | null>(null);

  // Get the index for the selected day or default to the first day (Monday)
  const dayIndex =
    daysList.indexOf(selectedDay as string) !== -1
      ? daysList.indexOf(selectedDay as string)
      : 0;

  // Get the cell values for the selected day
  const cellValue: any[] = Object.values(rows[dayIndex]);
  cellValue.splice(0, 2);

  console.log(cellValue);
  console.log(selectedDay);

  return (
    <div className="w-full flex items-center justify-normal flex-col px-4 space-y-4 py-8">
      <section className="w-full cursor-pointer gap-2 text-default-500 flex">
        <h3 className="hover:text-default-700">Batch: A13</h3>&#x27A3;
        <h4 className="hover:text-default-700">
          Day: {selectedDay ? selectedDay.toString() : "Monday"}
        </h4>
      </section>
      <Autocomplete
        radius="sm"
        label="Select the Day"
        placeholder={selectedDay ? selectedDay.toString() : "Select a day"}
        size="sm"
        onSelectionChange={(key) => setSelectedDay(key)}
        className="max-w-xs"
      >
        {daysList.map((day) => (
          <AutocompleteItem key={day}>{day}</AutocompleteItem>
        ))}
      </Autocomplete>

      <section className="space-y-3">
        {columns.map((column, index) => {
          const data = cellValue[index].split(" ");
          const Batch = data[0];
          const Classes = data[1];
          const Teacher = data[2];
          const Subject = data[3];
          return (
            <Card isHoverable className="w-[350px] " key={column.key}>
              <CardHeader className="text-xl font-semibold ">
                {column.label}
              </CardHeader>
              <CardBody
                className={
                  cellValue[index] === ""
                    ? "text-danger pl-8"
                    : "text-success pl-8"
                }
              >
                {cellValue[index] === "" ? (
                  "No Class for today"
                ) : (
                  <ol className="list-disc">
                    <li className=" flex gap-3">
                      <strong>Batch :</strong>
                      <p className="text-default-500">{Batch}</p>
                    </li>

                    <li className=" flex gap-3">
                      <strong>Classes :</strong>
                      <p className="text-default-500">{Classes}</p>
                    </li>
                    <li className=" flex gap-3">
                      <strong>Teacher :</strong>
                      <p className="text-default-500">{Teacher}</p>
                    </li>
                    <li className=" flex gap-3">
                      <strong>Subject :</strong>
                      <p className="text-default-500">{Subject}</p>
                    </li>
                  </ol>
                )}
              </CardBody>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
