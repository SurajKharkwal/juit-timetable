'use client'
import axios from "axios";
import { TimeTableUI } from "@/components/time-table/TimeTableUI";
import { useQuery } from "@tanstack/react-query";
import InputForm from "@/components/home-page/InputForm";

const Page = ({ searchParams }:
    { searchParams: { [key: string]: string | undefined } }
) => {

    const { data: timeTableData, isLoading } = useQuery({
        queryKey: ['getTimeTableData', searchParams.batch, searchParams.course],
        queryFn: async () => {
            const { data } = await axios.post("/api/get-time-table", {
                batch: searchParams.batch,
                course: searchParams.course
            })
            return data.data;
        },
    })

    return (
        <div>
            {!timeTableData &&
                <>
                    < InputForm />
                </>
            }
            {isLoading &&
                <div>Loading...</div>
            }
            {!isLoading &&
                <TimeTableUI rows={timeTableData} batch={searchParams.batch || ""} />
            }
        </div>
    )
};

export default Page;
