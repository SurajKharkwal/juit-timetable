"use client";

import { COURSES } from "@/lib/conts";
import { useTimetableForm } from "@/hooks/use-timetable-form";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";


export default function Home() {
  const { handleSubmit, setValue, error, value } = useTimetableForm()

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
