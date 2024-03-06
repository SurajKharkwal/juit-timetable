"use client"

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface SelectType {
    value: string;
    label: string;
}

interface AutoCompleteProps {
    setCourse: (value: string) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({ setCourse }) => {
    const { data: sheetNames } = useQuery({
        queryKey: ["courses"],
        queryFn: async () => {
            const { data } = await axios.get("/api/get-time-table-label");
            return data.data;
        }
    });

    const handleInputChange = (value: string) => {
        setCourse(value);
    };

    return (
        <div className="w-[350px]">
            <Autocomplete onInputChange={handleInputChange} label="Select Course">
                {
                    sheetNames ?
                        sheetNames.map((element: SelectType) => (
                            <AutocompleteItem key={element.value} value={element.value}>
                                {element.label}
                            </AutocompleteItem>
                        ))

                        :
                        [].map((element: SelectType) => (
                            <AutocompleteItem key={element.value} value={element.value}>
                                {element.label}
                            </AutocompleteItem>
                        ))
                }
            </Autocomplete>
        </div>
    );
};

export default AutoComplete;
