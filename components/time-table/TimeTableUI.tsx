"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Popover, } from "@nextui-org/react";
import React, { useState } from 'react'
import PopOver from "./PopOver";


type Props = {
    rows: {
        key: string;
    }[];
};


const TimeTableUI = ({ rows }: Props) => {

    const [value, setValue] = useState("");
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
            label: "12:00-1:00"
        },
        {
            key: "at1",
            label: "1:00-2:00",
        },
        {
            key: "at2",
            label: "2:00-3:00"
        },
        {
            key: "at3",
            label: "3:00-4:00",
        },
        {
            key: "at4",
            label: "4:00-5:00",
        }, {
            key: "at5",
            label: "5:00-6:00"
        }
    ];


    return (
        <div id="Zoom-Content" className="w-full h-full flex items-center">

            {
                value && <div className="top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 absolute  backdrop-blur-lg w-full h-full flex items-center text-xl justify-center flex-col">
                    <div className=" grid gap-4 border-2 rounded-xl p-2 ">
                        <p className="p-2 text-center flex items-center justify-center">{value}</p>
                        <h1 className="cursor-pointer bg-blue-400 rounded-lg p-2  text-black flex items-center justify-center " onClick={() => {
                            setValue("")
                        }}>Close</h1>

                    </div>
                </div>
            }
            <Table className="w-full" aria-label="Example table with dynamic content">
                <TableHeader className=" w-full h-full">
                    {columns.map((column) =>
                        <TableColumn className="text-xl text-blue-400 p-6  font-extrabold gap-2" key={column.key}>{column.label}</TableColumn>
                    )}
                </TableHeader>
                <TableBody className="w-full h-full" >
                    {rows.map((row) =>
                        <TableRow key={row.key}>
                            {(columnKey) => <TableCell onDoubleClick={() => {
                                setValue(getKeyValue(row, columnKey));
                            }} className="text-xl rounded-md border-1 w-[232.42]     border-blue-400/20 p-4 pb-4 cursor-pointer items-center justify-center">{getKeyValue(row, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export {
    TimeTableUI
}
