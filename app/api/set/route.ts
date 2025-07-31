import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { read } from "xlsx";
import parser from "./parser";
import { modelMap } from "@/database/modal";
import connectDB from "@/database/db";
import mongoose from "mongoose";
import { Courses } from "@/config/data";

export async function PUT(request: NextRequest) {
  const { password } = await request.json();
  if (password !== process.env.UPDATE_KEY) {
    return NextResponse.json({ error: "Invalid Password" }, { status: 401 });
  }

  await connectDB();
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const res = await axios.get(
      process.env.NEXT_PUBLIC_TIMETABLE_URL as string,
      { responseType: "arraybuffer" },
    );
    const fileBuffer = Buffer.from(res.data);
    const workbook = read(fileBuffer, { type: "buffer" });

    const sheetNames = workbook.SheetNames.slice(1); // Skip index 0

    for (const sheetName of sheetNames) {
      if (!Courses.includes(sheetName)) continue;
      const sheet = workbook.Sheets[sheetName];
      const records = parser(sheet);
      const model = modelMap[sheetName as keyof typeof modelMap];

      if (!model) {
        throw new Error(`Invalid sheetName: ${sheetName}`);
      }

      await model.deleteMany({}, { session });
      await model.insertMany(records, { session });
    }

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json(
      { message: "Processing complete." },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();

    return NextResponse.json(
      { error: "An unexpected error occurred.", details: err },
      { status: 500 },
    );
  }
}
