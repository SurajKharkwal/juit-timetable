'use client'
import { useState } from "react";
import InputForm from "./InputForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import TimeTableUI from "../time-table/TimeTableUI";

const FormAndTable = () => {
    const [input, setInput] = useState<{ batch: string, course: string }>({ batch: "", course: "" });

    const { mutate: getTimeTableData, data: tableRows, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("/api/get-time-table", input);
            return data.data;
        }
    })

    if (tableRows === undefined || tableRows === null) {
        return (
            <div>
                <InputForm getDataFunction={getTimeTableData} setInput={setInput} />
            </div>
        );
    }

    if (tableRows !== undefined || tableRows !== null) {
        return (
            <div className='w-full h-full'>
                {isPending && <div>
                    Loading ...
                </div>}
                <TimeTableUI rows={tableRows} />
            </div>
        );
    }
}

export default FormAndTable;
