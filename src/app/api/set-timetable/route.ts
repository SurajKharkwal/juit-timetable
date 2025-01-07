import connectDB from "@/lib/db/connect";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { read } from "xlsx";
import parseTimeTable from "./parseTimeTable";
import { modelMap } from "@/lib/db/model";

export async function PUT(request: NextRequest) {
  let excelUrl: string | undefined;

  try {
    const body = await request.json();
    excelUrl = body.excelUrl;

    if (!excelUrl || typeof excelUrl !== "string") {
      return NextResponse.json(
        { error: "Invalid or missing 'excelUrl' parameter." },
        { status: 400 }
      );
    }
    const res = await axios.get(excelUrl, { responseType: "arraybuffer" });
    const fileBuffer = Buffer.from(res.data);
    const workbook = read(fileBuffer, { type: "buffer" });
    await connectDB();
    workbook.SheetNames.forEach(async (sheetName, index) => {
      if (index == 0) return;
      const sheet = workbook.Sheets[sheetName];
      const records = parseTimeTable(sheet);
      records.forEach(ele => console.log(ele))
      const model = modelMap[sheetName as keyof typeof modelMap];
      await model.deleteMany()
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
    if (error instanceof Error && error.message.includes("Database")) {
      return NextResponse.json(
        { error: "Database operation failed.", details: error.message },
        { status: 500 }
      );
    }
    if (error instanceof Error && error.message.includes("Invalid or missing 'excelUrl'")) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "An unexpected error occurred.", details: error },
      { status: 500 }
    );
  }
}
