import connectDB from "@/lib/db/connect";
import { modelMap } from "@/lib/db/model";
import { NextRequest, NextResponse } from "next/server";
import { desktopData, modileData } from "./device";

export async function POST(req: NextRequest) {
  const { course, batch, isMobile, day } = await req.json();
  console.log("Pramas:", course, batch, isMobile, day)
  await connectDB();
  const model = modelMap[course as keyof typeof modelMap];
  if (isMobile) {
    return NextResponse.json(await modileData(model, batch, day), { status: 200 })
  }
  return NextResponse.json(await desktopData(model, batch), { status: 200 });
}

