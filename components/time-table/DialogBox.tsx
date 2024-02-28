import React, { useState } from 'react'
import AutoComplete from '../auto-complete/AutoCompelete'
import { Input } from '@nextui-org/input'
import { Button } from '@nextui-org/button';

type Props = {
    input: {
        batch: string;
        course: string;
    };
    setShowDialogBox(value: boolean): void;
    setInput(value: { batch: string, course: string }): void;
};
const DialogBox = ({ input, setShowDialogBox, setInput }: Props) => {
    const [data, setData] = useState<{ course: string; batch: string }>({ course: "", batch: "" });
    const [errorMessage, setErrorMessage] = useState("");
    
    const handleCourseChange = (selectedCourse: string) => {
        console.log(selectedCourse)
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

    const handleSubmit = async () => {
        console.log(data)
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
        setShowDialogBox(false)
        console.log(input)
    };

    return (
        <div className='w-full h-full absolute backdrop-blur-lg z-10  flex items-center justify-center '>
            <div className=' text-xl gap-4 flex items-start border-2 border-white/30 shadow-2xl bg-white/10 h-[40vh] rounded-lg p-8 justify-center flex-col'>
                <h1 className='text-blue-500 font-semibold'>Edit Form</h1>
                <div>
                    <h1>Select the Course</h1>
                    <AutoComplete setCourse={handleCourseChange} />
                </div>
                <div className='w-full'>
                    <h1>Select Batch</h1>
                    <Input onChange={(e)=>handleBatchChange(e.target.value)} />
                </div>
                <p className='text-red-500 w-full items-center justify-center flex font-extralight'>{errorMessage}</p>
                <div className='w-full gap-2 flex items-center justify-center '>
                    <Button onClick={handleSubmit} className='bg-blue-500 text-white'>Submit</Button>
                    <Button className='border-blue-500 border-2 bg-transparent text-blue-300'>Close</Button>
                </div>
            </div>
            <section className='absolute bottom-2 flex items-center justify-center flex-col'>
                <h6 className=' font-extralight'>created by</h6>
                <p className='font-bold text-blue-500'>SURAJ & SHORYA</p>
            </section>
        </div>
    )
}
export default DialogBox