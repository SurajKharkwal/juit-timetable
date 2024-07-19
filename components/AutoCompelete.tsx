"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { timeTable } from "@/utils/time-table";
import { ErrorType } from "./home-page/InputForm";

type SelectType = {
  label: string;
};

interface AutoCompleteProps {
  setCourse: (value: string) => void;
  error: ErrorType;
}

export default function AutoComplete({ setCourse, error }: AutoCompleteProps) {
  const output = Object.keys(timeTable);
  const sheetNames: SelectType[] = [];
  output.forEach((element) => {
    sheetNames.push({
      label: element,
    });
  });

  return (
    <Autocomplete
      className="w-[350px]"
      radius="sm"
      onInputChange={setCourse}
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
        <AutocompleteItem key={element.label} value={element.label}>
          {element.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
}
