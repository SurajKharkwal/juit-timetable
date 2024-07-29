"use client";

import { timeTable } from "@/utils/time-table";
import { Select, SelectItem } from "@nextui-org/select";
import { ErrorType } from "./InputForm";

type SelectType = {
  label: string;
};

interface AutoCompleteProps {
  setCourse: (value: string) => void;
  error: ErrorType;
}

export default function SelectBatch({ setCourse, error }: AutoCompleteProps) {
  const output = Object.keys(timeTable);
  const sheetNames: SelectType[] = [];
  output.forEach((element) => {
    sheetNames.push({
      label: element,
    });
  });

  return (
    <Select
      className="w-[350px]"
      radius="sm"
      onChange={(e) => setCourse(e.target.value)}
      description={
        error === "Course Required" ? (
          <span className="text-red-400">{error}</span>
        ) : (
          ""
        )
      }
      label="Select Course"
    >
      {sheetNames.map((element: SelectType) => (
        <SelectItem key={element.label} value={element.label}>
          {element.label}
        </SelectItem>
      ))}
    </Select>
  );
}
