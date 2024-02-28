'use client'
import { useEffect, useRef, useState } from "react";
import InputForm from "./InputForm";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { TimeTableUI } from "../time-table/TimeTableUI";
import gsap from "gsap"

const FormAndTable = () => {
    const [input, setInput] = useState<{ batch: string, course: string }>({ batch: "", course: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [notFound , setNotFound] = useState(false);
    const LoadingPageRef = useRef(null)

    const { mutate: getTimeTableData, data: tableRows } = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post("/api/get-time-table", input);
            return data.data;
        },
        onError: (err) => {
            if (err instanceof AxiosError) {
                if (err.response?.status === 404) {
                    setNotFound(true)
                    return undefined;
                }
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
                    <h1>Made By</h1>
                    <i className="text-blue-500">SHORYA & SURAJ</i>
                </section>
            </div>
        )
    }

    if (tableRows === undefined || tableRows === null) {
        return (
            <div>
                <InputForm getDataFunction={getTimeTableData} setInput={setInput} notFound={notFound}/>
            </div>
        );
    }

    if (tableRows !== undefined || tableRows !== null) {
        return (
            <TimeTableUI rows={tableRows} input={input} setInput={setInput} />
        );
    }

    return (
        <div>Some error occured</div>
    )
}

export default FormAndTable;
