"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const COURSES = [
  "BTECH SEM 1",
  "BTECH SEM 2",
  "BTECH SEM 3",
  "BTECH SEM 4",
  "BTECH SEM 5",
  "BTECH SEM 6",
  "BTECH SEM 7",
  "BTECH SEM 8",
];

type Query = {
  course: string;
  batch: string;
};

export default function Home() {
  const router = useRouter();

  const [value, setValue] = useState<Query>({
    course: "",
    batch: "",
  });

  const [error, setError] = useState<Query>({
    course: "",
    batch: "",
  });

  // Load from localStorage on first render
  useEffect(() => {
    const storedCourse = localStorage.getItem("course");
    const storedBatch = localStorage.getItem("batch");

    if (storedCourse || storedBatch) {
      setValue({
        course: storedCourse ?? "",
        batch: storedBatch ?? "",
      });
    }
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { course, batch } = value;

    if (!course) {
      setError({ course: "Course is required", batch: "" });
      return;
    }

    if (!batch) {
      setError({ course: "", batch: "Batch is required" });
      return;
    }

    setError({ course: "", batch: "" });

    localStorage.setItem("course", course);
    localStorage.setItem("batch", batch);

    router.push("/timetable");
  };

  return (
    <div className="min-h-dvh bg-background px-8">
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-md pt-24 flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl text-center font-semibold text-on-surface tracking-tight">
            JUIT Timetable
          </h1>
          <p className="text-sm text-center text-on-surface-variant">
            Select your course and batch to view today’s timetable
          </p>
        </div>

        <Select
          label="Select the course"
          selectedKeys={value.course ? [value.course] : []}
          onSelectionChange={(keys) =>
            setValue((prev) => ({
              ...prev,
              course: Array.from(keys)[0] as string,
            }))
          }
          classNames={{ description: "text-red-400" }}
          description={error.course}
        >
          {COURSES.map((ele) => (
            <SelectItem key={ele}>
              {ele}
            </SelectItem>
          ))}
        </Select>

        <Input
          label="Enter Batch"
          placeholder="Eg: 23A13"
          radius="lg"
          value={value.batch}
          onValueChange={(v) =>
            setValue((prev) => ({ ...prev, batch: v }))
          }
          classNames={{ description: "text-red-400" }}
          description={error.batch}
        />

        <Button type="submit" color="primary" className="w-fit mx-auto">
          Get Timetable
        </Button>
      </form>
    </div>
  );
}
