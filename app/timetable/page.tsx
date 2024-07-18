"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import InputForm from "@/components/home-page/InputForm";
import TimeTableUI from "@/components/time-table/TimeTableUI";
import SmallTimeTableUI from "@/components/time-table/SmallTimeTableUI";

const Page = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
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

  return (
    <div className=" w-full h-full flex items-center justify-center flex-col">
      {!timeTableData && (
        <>
          <InputForm />
        </>
      )}
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <SmallTimeTableUI rows={timeTableData}  />
      )}
    </div>
  );
};

export default Page;
