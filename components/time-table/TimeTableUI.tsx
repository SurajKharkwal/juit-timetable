"use client";
import React, { useState } from "react";
import { Autocomplete, AutocompleteItem, select } from "@nextui-org/react";
import DialogBox from "./DialogBox";

type Props = {
    rows: {
        key: string;
    }[];
    batch: string
};

const TimeTableUI = ({ rows, batch }: Props) => {
    const [selectedDay, setSelectedDay] = useState("Monday")
    const [showDialogBox, setShowDialogBox] = useState(false);

    const daysMap = {
        "Monday": 0,
        "Tuesday": 1,
        "Wednesday": 2,
        "Thursday": 3,
        "Firday": 4,
        "Saturday": 5,
    }

    const daysList = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Firday",
        "Saturday"
    ]

    const columns = [
        {
            key: "at9",
            label: "9:00AM",
        },
        {
            key: "at10",
            label: "10:00AM",
        },
        {
            key: "at11",
            label: "11:00AM",
        },
        {
            key: "at12",
            label: "12:00PM",
        },
        {
            key: "at1",
            label: "01:00PM",
        },
        {
            key: "at2",
            label: "02:00PM",
        },
        {
            key: "at3",
            label: "03:00PM",
        },
        {
            key: "at4",
            label: "04:00PM",
        },
        {
            key: "at5",
            label: "05:00PM",
        },
    ];

    const dayData = rows[daysMap[selectedDay as keyof typeof daysMap]] || rows[0];

    return (
        <div className="w-screen h-screen flex flex-col lg:flex-row items-center lg:justify-center lg:items-start lg:pt-16">
            {showDialogBox && (
                <DialogBox
                    setShowDialogBox={setShowDialogBox}
                />
            )}
            <div className="mt-5 w-[95%] md:w-[400px] bg-zinc-900 flex flex-col py-5 px-2 rounded-xl">
                <div className="flex my-3 gap-x-3">
                    <div className="flex flex-col text-left w-[50%] items-center bg-zinc-800 p-3 rounded-xl">
                        <span className="font-semibold text-2xl">Batch</span>
                        <span>{batch}</span>
                    </div>
                    <div className="flex flex-col text-left w-[50%] items-center bg-zinc-800 p-3 rounded-xl">
                        <span className="font-semibold text-xl">Day</span>
                        <span>{selectedDay}</span>
                    </div>
                </div>
                <Autocomplete onInputChange={(value) => setSelectedDay(value)} label="Select Day">
                    {
                        daysList.map((element, index) => (
                            <AutocompleteItem key={index} value={element}>
                                {element}
                            </AutocompleteItem>
                        ))
                    }
                </Autocomplete>
                <button
                    onClick={() => setShowDialogBox(true)}
                    className="w-[full] bg-blue-600 mt-5 py-2 rounded-xl">
                    Edit
                </button>
            </div>
            <div className="max-w-md mx-auto lg:mx-1 mb-8 mt-3 overflow-x-auto px-3">
                <table className="min-w-full rounded-xl bg-zinc-900">
                    <thead className="bg-zinc-800">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                Time
                            </th>
                            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider text-center">
                                Class
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent divide-y divide-zinc-200">
                        {columns.map((column, index) => (
                            <tr key={index} className="hover:bg-zinc-700">
                                <td className="px-6 py-4 whitespace-normal text-sm font-medium text-zinc-100">
                                    {column.label}
                                </td>
                                <td className="px-6 py-4 whitespace-normal text-sm text-zinc-300">
                                    {dayData[column.key as keyof typeof dayData]}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export { TimeTableUI };
