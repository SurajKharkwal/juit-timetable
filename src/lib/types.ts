export type TimetableEntry = {
  courseCode: string
  venue: string
  coordinator: string
  batches: string
  time: Time
}

export type Time =
  | "09:00 AM - 09:55 AM"
  | "10:00 AM - 10:55 AM"
  | "11:00 AM - 11:55 AM"
  | "12:00 PM - 12:55 PM"
  | "01:00 PM - 01:55 PM"
  | "02:00 PM - 02:55 PM"
  | "03:00 PM - 03:55 PM"
  | "04:00 PM - 04:55 PM"
  | "05:00 PM - 05:55 PM"

export type Day =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"



export type MongoEntry = {
  data: string[]
  day: Day,
  time: Time
}
