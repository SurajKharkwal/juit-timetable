"use client";

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
      if (!passwd.trim()) throw new Error("Password Required");
      if (passwd !== process.env.NEXT_PUBLIC_PASSWD) throw new Error("False Password");
      await axios.put("/api/set-timetable", { passwd });
    },
  });

  return (
    <div className="flex p-4 flex-col w-full h-screen items-center justify-center">
      <section className="max-w-md w-full flex-col flex gap-8">
        <h2 className="text-transparent text-center text-5xl bg-clip-text bg-gradient-to-b from-neutral-300 to-neutral-800">
          Juit Time Table
        </h2>
        <Snippet>{process.env.NEXT_PUBLIC_TIMETABLE_URL}</Snippet>

        <Input
          value={passwd}
          onChange={(e) => setPasswd(e.target.value)}
          label="Enter the password to update"
          type="password"
          description={
            isError && error?.message === "Password Required" ? error.message : null
          }
          classNames={{ description: "text-red-500" }}
        />

        {isError && error?.message === "False Password" && (
          <p className="text-red-500 text-center">Invalid password. Please try again.</p>
        )}

        <Button
          color="warning"
          className="max-w-sm mx-24"
          onPress={() => mutate()}
          isLoading={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>

        {isSuccess && (
          <p className="text-green-500 text-center">Timetable updated successfully!</p>
        )}
      </section>
    </div>
  );
}
