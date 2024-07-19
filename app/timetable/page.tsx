"use client";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import TimeTableUI from "@/components/time-table/TimeTableUI";
import SmallTimeTableUI from "@/components/time-table/SmallTimeTableUI";

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

  return (
    <div className=" w-full flex flex-col items-center justify-center">
      {isLoading && <div>Loading...</div>}
      {!isLoading && timeTableData && <SmallTimeTableUI rows={timeTableData} />}
    </div>
  );
};

export default Page;
