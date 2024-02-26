"use client"
import HomePage from '@/components/home-page/HomePage';
import TimeTableUI from '@/components/time-table/TImeTableUI';;
import React, { useState } from 'react';

const Page = () => {
    const [input, setInput] = useState<{batch: string, course: string}>({batch: "", course: ""});
    console.log("input", input);
    const [isLoading, setIsloading] = useState(true)

    if (input.batch === "" && input.course === "") {
        return (
            <div>
                <HomePage setIsloading={setIsloading} setInput={setInput} />
            </div>
        );
    }
    // if (isLoading) {
    //     return (
    //         <div className='w-full h-screen flex items-center justify-center'>
    //             <div className='border-3 rounded-full w-[40px] aspect-square border-t-blue-500 animate-spin'></div>
    //         </div>
    //     )
    // }
    if (Object.keys(input).length != 0) {
        return (
            <div className='w-full h-full'>
                <TimeTableUI Input={input} setIsloading={setIsloading}/>
            </div>
        );
    }
};

export default Page;