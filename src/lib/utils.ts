
export function getVariable(variableName: "NEXT_PUBLIC_SEM" | "NEXT_PUBLIC_TIMETABLE_URL" | "NEXT_PUBLIC_PASSWD" | "NEXT_PUBLIC+NEXT_PUBLIC_TIMETABLE_URL") {
  return String(process.env[variableName])
}
