import { timeTable } from "@/utils/time-table";
import { NextResponse } from "next/server";
export async function GET() {
    
    const output = Object.keys(timeTable);
    const outputOfObj:any = [];
    output.forEach(element => {
        outputOfObj.push({
            label: element,
            value: element
        })
    });

    return NextResponse.json({
        status: 200,
        data: outputOfObj
    })
}
