import { useState } from "react";
import { Days } from "@/config/data";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Select, SelectItem } from "@heroui/select";
import { findClassForBatch, toDisclude } from "@/lib/utils";
import { DATA } from "@/types";

// EVEN IDK WTF I've WRITEN
// I ain't reading ts

type PROPS = {
  course: string;
  batch: string;
  minor: string | null;
  data: DATA[];
};

const typeColors = {
  Lecture: "border-blue-500",
  Practical: "border-green-500",
  Tutorial: "border-yellow-500",
};

const classTypeMap = {
  Lecture: "Lecture 📘",
  Tutorial: "Tutorial 📝",
  Practical: "Practical 🧪",
};

export function SmTimetable({ course, minor, batch, data }: PROPS) {
  const [selectedDay, setSelectedDay] = useState(() => {
    const now = new Date();
    let jsDayIndex = now.getDay();

    if (now.getHours() >= 18) jsDayIndex += 1;
    if (jsDayIndex === 0) jsDayIndex = 1;
    if (jsDayIndex === 0 || jsDayIndex > 6) jsDayIndex = 1;

    return Days[jsDayIndex - 1];
  });

  const todaySchedule = data.filter((entry) => entry.day === selectedDay);
  const toSkip = toDisclude(course, minor);

  return (
    <section className="flex flex-col items-center justify-center gap-4">
      <Select
        onChange={(e) => setSelectedDay(e.target.value)}
        aria-label="Select day"
        label="Select Day"
        placeholder={selectedDay}
      >
        {Days.map((day) => (
          <SelectItem key={day}>{day}</SelectItem>
        ))}
      </Select>

      {todaySchedule.map((entry) => {
        const classInfo = findClassForBatch(batch, entry.data, toSkip);

        if (!classInfo) {
          return (
            <Card
              radius="lg"
              key={entry._id}
              className="max-w-md w-full border-l-red-500 border-l-4"
            >
              <CardHeader>{entry.time}</CardHeader>
              <CardBody>No class scheduled for this batch.</CardBody>
            </Card>
          );
        }

        return (
          <Card
            radius="lg"
            key={entry._id}
            className={`max-w-md w-full shadow-md rounded-lg overflow-hidden border-l-4 ${typeColors[classInfo.type]}`}
          >
            <CardHeader className="flex justify-between items-center text-gray-800 dark:text-gray-200">
              <span className="text-lg font-semibold">{entry.time}</span>
              <span className="text-sm font-bold">
                {classTypeMap[classInfo.type]}
              </span>
            </CardHeader>
            <CardBody className="text-gray-800 dark:text-gray-300 space-y-1">
              <p>
                <strong>Course:</strong>{" "}
                <span className="capitalize">{classInfo.courseCode}</span>
              </p>
              <p>
                <strong>Batches:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {classInfo.batches.join(", ")}
                </span>
              </p>
              <p>
                <strong>Coordinator:</strong>{" "}
                <span className="text-gray-700 dark:text-gray-200">
                  {classInfo.coordinator}
                </span>
              </p>
              <p className="flex justify-between items-center">
                <span>
                  <strong>Venue:</strong>{" "}
                  <span className="text-gray-700 dark:text-gray-200">
                    {classInfo.venue}
                  </span>
                </span>
                {classInfo.floor && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {classInfo.floor}
                  </span>
                )}
              </p>
            </CardBody>
          </Card>
        );
      })}
    </section>
  );
}
