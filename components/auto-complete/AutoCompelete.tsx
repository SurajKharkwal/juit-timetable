"use client"

import React, { useEffect, useState } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";

interface SelectType {
  value: string;
  label: string;
}

interface AutoCompleteProps {
  setCourse: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ setCourse }) => {
  const [data, setData] = useState<SelectType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/get-time-table-label");
        console.log(response)
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleInputChange = (value: string) => {
    setCourse(value);
  };

  return (
    <div className="w-[350px]">
      <Autocomplete onInputChange={handleInputChange} label="Select a Field">
        {data.map((element) => (
          <AutocompleteItem key={element.value} value={element.value}>
            {element.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export default AutoComplete;