'use client'
import { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import TimeTableUI from "../time-table/TimeTableUI";
import gsap from "gsap"


const FormAndTable = () => {
    const [input, setInput] = useState<{ batch: string, course: string }>({ batch: "", course: "" });
    const [isLoading, setIsLoading] = useState(true);
    const LoadingPageRef = useRef(null)
    const [errorMessage, setErrorMessage] = useState("");
    const { mutate: getTimeTableData, data: tableRows, isPending } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("/api/get-time-table", input);
            if (data.status == 200){
                return data.data;
            }else {
                setErrorMessage("No Data Found  ")
                return undefined;
            }
        }
    })
    useEffect(() => {
        gsap.set(LoadingPageRef.current, {
            scale: 0.5,
            opacity: 0,
        })
        const tl = gsap.timeline();
        tl.to(LoadingPageRef.current, {
            delay: 0.5,
            scale: 1,
            ease: "power2.inOut",
            opacity: 1
        })
        tl.to(LoadingPageRef.current, {
            delay: 0.5,
            ease: "power2.inOut",
            scale: 40,
        })
        const timeout = setTimeout(() => {
            setIsLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    }, [])
    if (isLoading) {
        return (
            <div className="w-full h-screen">
                <section ref={LoadingPageRef} className="w-full gap-4 font-bold h-full text-5xl flex flex-col items-center justify-center">
                    <h1>Ready, </h1>
                    <h1>
                        to dive into
                    </h1>
                    <i className="text-blue-500">SHORYA SURAJ</i>
                    <h1>
                        project?
                    </h1>

                </section>
            </div>
        )
    }

    if (tableRows === undefined || tableRows === null) {
        return (
            <div>
                <InputForm setErrorMessage={setErrorMessage} errorMessage={errorMessage} getDataFunction={getTimeTableData} setInput={setInput} />
            </div>
        );
    }

    if (tableRows !== undefined || tableRows !== null) {
        return (
            <TimeTableUI rows={tableRows} />
        );
    }

    return (
        <div>Some error occured</div>
    )
}

export default FormAndTable;
