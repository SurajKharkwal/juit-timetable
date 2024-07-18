"use client"
import React, { useEffect, useRef, useState } from "react";
import { Input, Button, Spinner } from "@nextui-org/react";
import AutoComplete from "@/components/auto-complete/AutoCompelete";
import Navigation from "../navigation/Navigation";
import { useRouter } from "next/navigation";

const InputForm = () => {
    const loadingAnimationRef = useRef(null)
    const inputField = useRef<HTMLInputElement>(null);
    const [data, setData] = useState<{ course: string; batch: string }>({ course: "", batch: "" });
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleCourseChange = (selectedCourse: string) => {
        setData({ ...data, course: selectedCourse });
    };

    const handleBatchChange = (batch: string) => {
        let formatedBatch: string = "";
        batch.split("").forEach(element => {
            if (element !== " " && element !== "-")
                formatedBatch += element.toUpperCase();
        });
        setData({ ...data, batch: formatedBatch });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const encodedBatch = encodeURI(data.batch);
        const encodedCourse = encodeURI(data.course);
        router.push(`/timetable?batch=${encodedBatch}&course=${encodedCourse}`);
    };
    return (
        <div ref={loadingAnimationRef} className="w-full gap-12 h-[100dvh] flex flex-col text-xl items-center justify-center ">
            <Navigation />
            <h1 className="text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
                JUIT TIME TABLE
            </h1>
            <form onSubmit={handleSubmit} className="flex flex-col text-xl items-center justify-center gap-y-8">
                <div className="grid justify-center items-center gap-4">
                    <h1>Select Course</h1>
                    <AutoComplete setCourse={handleCourseChange} />
                </div>
                <div className="grid items-center justify-center gap-2">
                    <h1>Select Batch</h1>
                    <Input
                        ref={inputField}
                        className="w-[350px]"
                        type="text"
                        label="Select Batch A13, CS12 ..."
                        onChange={(e) => handleBatchChange(e.target.value)}
                    />
                </div>
                {errorMessage && <p className="font-extralight text-red-500 text-xl ">{errorMessage}</p>}
                <Button
                    type="submit"
                    className="bg-blue-500"
                >
                    Submit
                </Button>
            </form>
            <div className="absolute bottom-4 font-extralight flex items-center justify-center flex-col">
                <h6>created by</h6>
                <p className="text-blue-500 font-bold ">SURAJ & SHORYA</p>
            </div>
        </div>
    );
};

export default InputForm;
