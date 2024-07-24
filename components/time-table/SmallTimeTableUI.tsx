"use client";
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Key, useEffect, useRef, useState } from "react";

type Props = {
    rows: { key: string }[],
    batch: string
}

export const columns = [
    { key: "at9", label: "9:00-10:00", delay: 'delay-0' },
    { key: "at10", label: "10:00-11:00", delay: 'delay-75' },
    { key: "at11", label: "11:00-12:00", delay: 'delay-150' },
    { key: "at12", label: "12:00-1:00", delay: 'delay-200' },
    { key: "at1", label: "1:00-2:000", delay: 'delay-300' },
    { key: "at2", label: "2:00-3:00", delay: 'delay-500' },
    { key: "at3", label: "3:00-4:00", delay: 'delay-700' },
    { key: "at4", label: "4:00-5:00", delay: 'delay-700' },
    { key: "at5", label: "5:00-6:00", delay: 'delay-700' },
];

const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

const parseClassData = (value: string): string[] => {
    return value.split(" ").filter(value => value != "");
}

export default function SmallTimeTableUI({ rows, batch }: Props) {
    const [selectedDay, setSelectedDay] = useState<Key | null>(null);
    const animationRefs = useRef<HTMLElement[]>([]);

    // Get the index for the selected day or default to the first day (Monday)
    const dayIndex =
        daysList.indexOf(selectedDay as string) !== -1
            ? daysList.indexOf(selectedDay as string)
            : 0;

    // Get the cell values for the selected day
    const cellValue: any[] = Object.values(rows[dayIndex]);
    cellValue.splice(0, 2);

    useEffect(() => {
        animationRefs.current.forEach((element, index) => {
            if (element) {
                element.classList.add('animate-in', 'fade-in', 'duration-700', `${columns[index].delay}`);
            }
        });

        return () => {
            animationRefs.current.forEach((element, index) => {
                if (element) {
                    element.classList.remove('animate-in', 'fade-in', 'duration-700', `${columns[index].delay}`);
                }
            });
        };
    }, [selectedDay]);

    return (
        <div className="w-full flex items-center justify-normal flex-col px-4 space-y-4 py-8 ">
            <section className="w-full cursor-pointer gap-2 text-default-500 flex">
                <h3 className="hover:text-default-700">Batch: {batch}</h3>&#x27A3;
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

            <section className="space-y-3 ">
                {columns.map((column, index) => {
                    const data = parseClassData(cellValue[index]);
                    const subject = data[0];
                    const batches = data[1];
                    const teacher = data[2];
                    const venue = data[3];
                    return (
                        <Card isHoverable className="w-[330px] " key={column.key}
                            ref={(element) => {
                                if (element) animationRefs.current[index] = element;
                            }}
                        >
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
                                    "No Class In this slot"
                                ) : (
                                    <ol className="list-disc">
                                        <li className=" flex gap-3">
                                            <strong>Subject :</strong>
                                            <p className="text-default-500">{subject}</p>
                                        </li>
                                        <li className=" flex gap-3">
                                            <strong>Batches :</strong>
                                            <p className="text-default-500">{batches}</p>
                                        </li>

                                        <li className=" flex gap-3">
                                            <strong>Teacher :</strong>
                                            <p className="text-default-500">{teacher}</p>
                                        </li>
                                        <li className=" flex gap-3">
                                            <strong>Venue :</strong>
                                            <p className="text-default-500">{venue}</p>
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
