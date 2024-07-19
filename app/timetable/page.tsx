"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TimeTableUI from "@/components/time-table/TimeTableUI";
import SmallTimeTableUI from "@/components/time-table/SmallTimeTableUI";
import { Spinner } from "@nextui-org/spinner";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const router = useRouter();

  const { data: timeTableData, isLoading } = useQuery({
    queryKey: ["getTimeTableData", searchParams.batch, searchParams.course],
    queryFn: async () => {
      const { data } = await axios.post("/api/get-time-table", {
        batch: searchParams.batch,
        course: searchParams.course,
      });
      return data.data;
    },
  });

  if (!isLoading && !timeTableData) {
    //Reomve this alert and add not found toast for user
    alert("No data found for given course and batch");
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className=" w-full h-dvh flex items-center justify-center ">
        <Spinner />
      </div>
    );
  }
  if (window != undefined && !isLoading) {
    return window.innerWidth > 1024 ? (
      <div>
        <TimeTableUI rows={timeTableData} />
      </div>
    ) : (
      <div className="p-1 flex items-center justify-center">
        <SmallTimeTableUI rows={timeTableData} />
      </div>
    );
  }
  return <>some error</>;
};

export default Page;
