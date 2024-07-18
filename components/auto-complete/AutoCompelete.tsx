"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { timeTable } from "@/utils/time-table";
import { ErrorType } from "../home-page/InputForm";
import { error } from "console";

type SelectType = {
  label: string;
};

interface AutoCompleteProps {
  setCourse: (value: string) => void;
  error: ErrorType;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ setCourse, error }) => {
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
      variant="bordered"
      radius="sm"
      onInputChange={setCourse}
          description={error === "Course Required" ? <span className="text-red-400">{error }</span>: ""}
      label="Select Course"
    >
      {sheetNames.map((element: SelectType) => (
        <AutocompleteItem
          variant="bordered"
          key={element.label}
          value={element.label}
        >
          {element.label}
        </AutocompleteItem>
      ))}
    </Autocomplete>
  );
};

export default AutoComplete;
