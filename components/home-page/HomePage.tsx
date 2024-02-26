"use client"
import React, { useRef, useState } from "react";

import { Input, Button } from "@nextui-org/react";
import AutoComplete from "@/components/auto-complete/AutoCompelete";
import axios from "axios";

interface InputType {
    setInput: (value: {
        course: string;
        batch: string;
    }) => void;
    setIsloading: (value: boolean) => void;
}

const HomePage = ({ setInput, setIsloading }: InputType) => {
    const inputField = useRef<HTMLInputElement>(null);
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [data, setData] = useState<{ course: string; batch: string }>({ course: "", batch: "" });
    const [course, setCourse] = useState<string>("");
    const [isData, setIsData] = useState(false);

    const handleCourseChange = (selectedCourse: string) => {
        setCourse(selectedCourse);
        setData({ ...data, course: selectedCourse });
    };

    const handleBatchChange = (batch: string) => {
        setData({ ...data, batch });
    };

    const handleSubmit = async () => {
        if (!data.course) {
            setErrorMessage("Please select a course");
            return;
        }

        if (!data.batch) {
            setErrorMessage("Please enter the Batch");
            return;
        }

        setErrorMessage("");
        setInput(
            {
                course: data.course,
                batch: data.batch
            }
        )
    };

    return (
        <div className="w-full gap-12 h-screen flex flex-col text-xl items-center justify-center ">
            <h1 className="text-blue-500 text-4xl font-extrabold">FLYING HAWK</h1>
            <div className="grid justify-center items-center gap-4">
                <h1>Select the Course</h1>
                <AutoComplete setCourse={handleCourseChange} />
            </div>
            <div className="grid items-center justify-center gap-2">
                <h1>Select the Batch</h1>
                <Input
                    ref={inputField}
                    className="w-[350px]"
                    type="text"
                    label="Select Batch A-13, CS-12 ..."
                    onChange={(e) => handleBatchChange(e.target.value)}
                />
            </div>
            {errorMessage && <p className="font-extralight text-red-500 text-xl ">{errorMessage}</p>}
            <Button onClick={handleSubmit} isDisabled={isData} className="bg-blue-500">
                Submit
            </Button>
        </div>
    );
};

export default HomePage;