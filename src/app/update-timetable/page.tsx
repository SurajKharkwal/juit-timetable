"use client"

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Snippet } from "@nextui-org/snippet";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

export default function App() {
  const [passwd, setPasswd] = useState("");

  const { mutate, isError, isSuccess, isPending: isLoading, error } = useMutation({
    mutationFn: async () => {
      const response = await axios.put("/api/set-timetable", { passwd });
      return response.data;
    },
  });

  return (
    <div className="flex p-4 flex-col w-full h-screen items-center justify-center">
      <section className="max-w-lg w-full flex-col flex gap-8">
        <h2 className="text-transparent text-center text-5xl bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-800">
          Juit Time Table
        </h2>
        <Snippet radius="sm" size="lg"
          className="max-md:whitespace-nowrap overflow-x-auto max-md:p-4 max-w-lg w-full"
        >{process.env.NEXT_PUBLIC_TIMETABLE_URL}</Snippet>

        <form className="flex flex-col items-center" onSubmit={(e) => { e.preventDefault(); mutate() }}>
          <Input
            value={passwd}
            onChange={(e) => setPasswd(e.target.value)}
            label="Enter the password to update"
            type="password"
            radius="sm"
            description={
              isError && error.message === "Request failed with status code 401"
                ? "Invalid password. Please try again."
                : null
            }
            classNames={{ description: "text-red-500" }}
          />

          <Button
            color="primary"
            type="submit"
            radius="sm"
            className="max-w-sm w-full my-6"
            isLoading={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </Button>

        </form>
        {isSuccess && (
          <p className="text-green-500 text-center">Timetable updated successfully!</p>
        )}
      </section>
    </div>
  );
}
