"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { Select, SelectItem } from "@nextui-org/select";
import { useEffect, useRef, useState } from "react";

type Props = {
    rows: { key: string }[];
    batch: string;
};

export const columns = [
    { key: "at9", label: "9:00-10:00", delay: "delay-0" },
    { key: "at10", label: "10:00-11:00", delay: "delay-75" },
    { key: "at11", label: "11:00-12:00", delay: "delay-150" },
    { key: "at12", label: "12:00-1:00", delay: "delay-200" },
    { key: "at1", label: "1:00-2:00", delay: "delay-300" },
    { key: "at2", label: "2:00-3:00", delay: "delay-500" },
    { key: "at3", label: "3:00-4:00", delay: "delay-700" },
    { key: "at4", label: "4:00-5:00", delay: "delay-700" },
    { key: "at5", label: "5:00-6:00", delay: "delay-700" },
];

const daysList = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
] as const;

type Day = (typeof daysList)[number];

const parseClassData = (value: string): string[] => {
    return value.split(" ").filter((value) => value !== "");
};

export default function SmallTimeTableUI({ rows, batch }: Props) {
    const [selectedDay, setSelectedDay] = useState<Day>(() => {
        const dayNumber = new Date().getDay();
        return daysList[dayNumber === 7 ? 0 : dayNumber - 1];
    });
    const animationRefs = useRef<(HTMLElement | null)[]>([]);

    // Get the index for the selected day or default to the first day (Monday)
    const dayIndex =
        daysList.indexOf(selectedDay) !== -1 ? daysList.indexOf(selectedDay) : 0;

    // Get the cell values for the selected day
    const cellValue: any[] = Object.values(rows[dayIndex]);
    cellValue.splice(0, 2);

    useEffect(() => {
        // Clear previous animations
        animationRefs.current.forEach((element, index) => {
            if (element) {
                element.classList.remove(
                    "animate-in",
                    "fade-in",
                    "duration-700",
                    columns[index].delay
                );
            }
        });

        // Force reflow to restart animations
        void animationRefs.current[0]?.offsetWidth;

        // Add new animations
        animationRefs.current.forEach((element, index) => {
            if (element) {
                element.classList.add(
                    "animate-in",
                    "fade-in",
                    "duration-700",
                    columns[index].delay
                );
            }
        });
    }, [selectedDay]);

    return (
        <div className="w-full flex items-center justify-normal flex-col px-4 space-y-4 py-8 ">
            <Breadcrumbs className="w-full">
                <BreadcrumbItem href="/">
                    Home
                </BreadcrumbItem>
                <BreadcrumbItem color="warning">{selectedDay}</BreadcrumbItem>
            </Breadcrumbs>
            <Select
                radius="sm"
                label="Select the Day"
                size="sm"
                onChange={(e) => setSelectedDay(e.target.value as Day)}
                className="max-w-xs"
            >
                {daysList.map((day) => (
                    <SelectItem key={day}>{day}</SelectItem>
                ))}
            </Select>

            <section className="space-y-3 ">
                {columns.map((column, index) => {
                    const data = parseClassData(cellValue[index]);
                    const subject = data[0];
                    const batches = data[1];
                    const teacher = data[2];
                    const venue = data[3];
                    const type = data[4];
                    return (
                        <Card
                            isHoverable
                            className="w-[330px] "
                            key={column.key}
                            ref={(element) => {
                                animationRefs.current[index] = element;
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
                                        <li className="flex gap-3">
                                            <strong className="flex-nowrap">Subject:</strong>
                                            <p className="text-default-500">{subject.replace(/-/g , ' ')}</p>
                                        </li>
                                        <li className=" flex gap-3">
                                            <strong>Batches:</strong>
                                            <p className="text-default-500">{batches}</p>
                                        </li>

                                        <li className=" flex gap-3">
                                            <strong>Teacher :</strong>
                                            <p className="text-default-500">{teacher}</p>
                                        </li>
                                        <li className=" flex gap-3">
                                            <strong>Venue :</strong>
                                            <p className="text-default-500">{venue.toUpperCase()}</p>
                                        </li>
                                        <li className=" flex gap-3">
                                            <strong>Type :</strong>
                                            <p className="text-default-500">{type}</p>
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
