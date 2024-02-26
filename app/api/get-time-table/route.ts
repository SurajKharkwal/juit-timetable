import { NextResponse } from "next/server";
import { timeTable } from "@/utils/time-table";

export async function POST(req: Request) {

    const { batch, course } = await req.json();

    interface Day {
        key: string,
        day: string,
        at9: string,
        at10: string,
        at11: string,
        at12: string,
        at1: string,
        at2: string,
        at3: string,
        at4: string,
        at5: string,
    }

    interface Days {
        [key: string]: number
    }

    let timeTabeleData = timeTable[course];
    let parsedTimeTable: Day[] = [
        {
            key: '1',
            day: "MON",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        },
        {
            key: '2',
            day: "TUE",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        },
        {
            key: '3',
            day: "WED",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        },
        {
            key: '4',
            day: "THU",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        },
        {
            key: '5',
            day: "FRI",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        },
        {
            key: '6',
            day: "SAT",
            at9: "",
            at10: "",
            at11: "",
            at12: "",
            at1: "",
            at2: "",
            at3: "",
            at4: "",
            at5: "",
        }

    ];

    const days: Days = {
        MON: 0,
        TUE: 1,
        WED: 2,
        THU: 3,
        FRI: 4,
        SAT: 5,
    }

    let currRecord: Day = parsedTimeTable[0];
    for (let classData of timeTabeleData) {
        if (days[classData.name] != undefined) {
            currRecord = parsedTimeTable[days[classData.name]];
            continue;
        }
        if (classData.name.includes(batch)) {
            if (classData.colNumber == 2) {
                currRecord.at9 = classData.name
            }
            else if (classData.colNumber == 3) {
                currRecord.at10 = classData.name;
            }
            else if (classData.colNumber == 4) {
                currRecord.at11 = classData.name;
            }
            else if (classData.colNumber == 5) {
                currRecord.at12 = classData.name;
            }
            else if (classData.colNumber == 6) {
                currRecord.at1 = classData.name;
            }
            else if (classData.colNumber == 7) {
                currRecord.at2 = classData.name;
            }
            else if (classData.colNumber == 8) {
                currRecord.at3 = classData.name;
            }
            else if (classData.colNumber == 9) {
                currRecord.at4 = classData.name;
            }
            else if (classData.colNumber == 10) {
                currRecord.at5 = classData.name;
            }
        }
    }

    return NextResponse.json({
        status: 200,
        data: parsedTimeTable
    })
}
