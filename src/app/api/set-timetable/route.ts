import connectDB from "@/lib/db/connect";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { read } from "xlsx";
import parseTimeTable from "./parseTimeTable";
import { modelMap } from "@/lib/db/model";

export async function PUT(request: NextRequest) {
  const excelUrl = process.env.NEXT_PUBLIC_TIMETABLE_URL as string;
  const myPasswd = process.env.PASSWD;
  const { passwd } = await request.json();

  if (myPasswd !== passwd) {
    return NextResponse.json(
      { error: "Invalid Password" },
      { status: 401 }
    );
  }

  try {
    const res = await axios.get(excelUrl, { responseType: "arraybuffer" });
    const fileBuffer = Buffer.from(res.data);
    const workbook = read(fileBuffer, { type: "buffer" });
    await connectDB();

    workbook.SheetNames.forEach(async (sheetName, index) => {
      if (index === 0) return;
      const sheet = workbook.Sheets[sheetName];
      const records = parseTimeTable(sheet);
      const model = modelMap[sheetName as keyof typeof modelMap];
      await model.deleteMany();
      await model.insertMany(records).catch((error) => {
        throw new Error(`Database insert error: ${error.message}`);
      });
    });

    return NextResponse.json({ message: "Processing complete." }, { status: 200 });
  } catch (error) {
    console.error("Error occurred:", error);
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        { error: "Failed to fetch the Excel file.", details: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred.", details: error },
      { status: 500 }
    );
  }
}
