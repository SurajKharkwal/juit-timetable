export const EVEN_SEM = [
  "BTECH SEM 2",
  "BTECH SEM 4",
  "BTECH SEM 6",
  "BTECH SEM 8",
  "MTECH SEM 2",
  "MTECH SEM 4",
]

export const ODD_SEM = [
  "BTECH SEM 1",
  "BTECH SEM 3",
  "BTECH SEM 5",
  "BTECH SEM 7",
  "MTECH SEM 1",
  "MTECH SEM 2",
]

export const CLASS_TIME = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
]

export const TIMETABLE_FILE = {
  "BTECH SEM 1": "btechsem1.json",
  "BTECH SEM 2": "btechsem2.json",
  "BTECH SEM 3": "btechsem3.json",
  "BTECH SEM 4": "btechsem4.json",
  "BTECH SEM 5": "btechsem5.json",
  "BTECH SEM 6": "btechsem6.json",
  "BTECH SEM 7": "btechsem7.json",
  "BTECH SEM 8": "btechsem8.json",
  "MTECH SEM 1": "mtechsem1.json",
  "MTECH SEM 2": "mtechsem2.json",
  "MTECH SEM 3": "mtechsem3.json",
  "MTECH SEM 4": "mtechsem4.json",
}
export type CourseKey = keyof typeof TIMETABLE_FILE

export type WeekDay =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"

export const WEEK_DAYS: WeekDay[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
]
