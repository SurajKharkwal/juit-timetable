import { NextResponse } from "next/server";
import { timeTable } from "@/utils/time-table";

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

const parseClassData = (value: string): string[] => {
    return value.split(" ").filter(value => value != "");
}

export async function POST(req: Request) {

    const { batch, course } = await req.json();

    if (!batch || !course) {
        return NextResponse.json({ error: "Year and batch not provided" }, { status: 403 })
    }

    let timeTabeleData = timeTable[course];
    let parsedTimeTable: Day[] = [
        {
            key: '1',
            day: "MONDAY",
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
            day: "TUESDAY",
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
            day: "WEDNESDAY",
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
            day: "THURSDAY",
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
            day: "FRIDAY",
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
            day: "SATURDAY",
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

    let isDataFound = false;
    let currRecord: Day = parsedTimeTable[0];

    for (let classData of timeTabeleData) {
        if (days[classData.value] != undefined) {
            currRecord = parsedTimeTable[days[classData.value]];
            continue;
        }
        const data = parseClassData(classData.value);
        const batchesData = data[1]?.split(",");
        let batches = batchesData?.map(b => {
            const prefix = b.charAt(0);
            if (prefix >= '0' && prefix <= '9') {
                return b.slice(2);
            }
            return b;
        }) || [];

        if (batches?.includes(batch)) {
            isDataFound = true;
            if (classData.colNumber == 2) {
                currRecord.at9 = classData.value
            }
            else if (classData.colNumber == 3) {
                currRecord.at10 = classData.value;
            }
            else if (classData.colNumber == 4) {
                currRecord.at11 = classData.value;
            }
            else if (classData.colNumber == 5) {
                currRecord.at12 = classData.value;
            }
            else if (classData.colNumber == 6) {
                currRecord.at1 = classData.value;
            }
            else if (classData.colNumber == 7) {
                currRecord.at2 = classData.value;
            }
            else if (classData.colNumber == 8) {
                currRecord.at3 = classData.value;
            }
            else if (classData.colNumber == 9) {
                currRecord.at4 = classData.value;
            }
            else if (classData.colNumber == 10) {
                currRecord.at5 = classData.value;
            }
        }
    }

    if (!isDataFound) {
        return NextResponse.json({ error: 'No Data Found' }, { status: 404 })
    }
    return NextResponse.json({ data: parsedTimeTable }, { status: 200 });
}
