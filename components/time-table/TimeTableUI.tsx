"use client"
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Button } from "@nextui-org/react";
import React, { useEffect, useRef, useState } from 'react'
import { MdEditSquare } from "react-icons/md";
import { FiPlusCircle } from "react-icons/fi";
import { LuMinusCircle } from "react-icons/lu";
import { IoArrowUndoCircleOutline, IoSettingsOutline } from "react-icons/io5";
import DialogBox from "./DialogBox";
type Props = {
    rows: {
        key: string;
    }[];
    input: {
        batch: string;
        course: string;
    };
    setInput(value: { batch: string, course: string}): void;
};


const TimeTableUI = ({ rows, input, setInput }: Props) => {

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

    const [onClickValue, setOnClickValue] = useState(false);
    const [showDialogBox, setShowDialogBox] = useState(false);
    const spinRef = useRef(null)
    const handleDialogBox = () => {

    }

    return (
        <div className=" flex items-center justify-center min-w-screen min-h-[100dvh] p-4 max-md:p-1 bg-black">
            {
                showDialogBox ? <DialogBox setShowDialogBox={setShowDialogBox} input={input} setInput={setInput} /> : null
            }
             <div className="fixed z-10 flex items-center bg-white/10 rounded-lg p-2 justify-center gap-2 bottom-4 right-4">
                {
                    onClickValue ? (
                        <>
                            <Button onClick={() => setShowDialogBox(!showDialogBox)} className="bg-transparent hover:bg-neutral-800 " isIconOnly> <MdEditSquare className="text-3xl" /></Button>
                            <Button className="bg-transparent hover:bg-neutral-800" isIconOnly> <FiPlusCircle className="text-3xl" /></Button>
                            <Button className="bg-transparent hover:bg-neutral-800" isIconOnly> <LuMinusCircle className="text-3xl" /></Button>
                            <Button className="bg-transparent hover:bg-neutral-800" isIconOnly> <IoArrowUndoCircleOutline className="text-3xl" /></Button>
                        </>
                    ) : null
                }
                <Button ref={spinRef} id="spin" onClick={() => setOnClickValue(!onClickValue)} isIconOnly> <IoSettingsOutline className="bg-transparent text-3xl" /></Button>
            </div>

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
                            }} className="text-xl rounded-md border-1 border-blue-400/20 p-4 pb-4 cursor-pointer items-center justify-center">{getKeyValue(row, columnKey)}</TableCell>}
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
