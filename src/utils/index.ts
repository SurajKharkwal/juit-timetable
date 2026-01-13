import { WEEK_DAYS } from "./constants"

export function getInitialDay() {
  const now = new Date()

  const hour = now.getHours()
  let dayIndex = now.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

  // Map JS day → our index (Mon=0)
  if (dayIndex === 0) {
    dayIndex = 1 // Sunday → Monday
  }

  let index = dayIndex - 1 // Monday = 0

  // After 6 PM → next day
  if (hour >= 18) {
    index += 1
  }

  // Clamp to Saturday
  if (index >= WEEK_DAYS.length) {
    index = WEEK_DAYS.length - 1
  }

  return index
}

export function extractTimetableEntries(batch: string, data: string[]) {
  const regex =
    /^\s*([A-Z0-9]-\d+[A-Z0-9]+(?:\s*\/\s*\d+[A-Z0-9]+)*)\s+(.+?)\s*\(([^)]+)\)\s*([A-Z0-9_\/,\s]+)\s*$/;

  const allBranches = [];
  for (const line of data) {
    const match = line.match(regex);
    if (!match) {
      console.log("line is ", line);
      continue;
    }

    const [, classCode, batchRaw, teacher, venue] = match;

    if (batchRaw === "ALL BRANCHES") {
      allBranches.push({
        classType:
          classCode.charAt(0) === "T"
            ? "Tutorial"
            : classCode.charAt(0) === "P"
              ? "Practical"
              : "Lecture",
        courseCode: classCode,
        teacherCode: teacher,
        venue: venue,
        batches: batchRaw,
      });
      continue;
    }
    if (batchRaw.includes(batch) || batchRaw === "ALL BRANCHES")
      return [
        {
          classType:
            classCode.charAt(0) === "T"
              ? "Tutorial"
              : classCode.charAt(0) === "P"
                ? "Practical"
                : "Lecture",
          courseCode: classCode,
          teacherCode: teacher,
          venue: venue,
          batches: batchRaw,
        },
      ];
  }
  if (allBranches.length > 0) {
    return allBranches;
  }

  return null;
}
