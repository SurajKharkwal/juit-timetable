// Dear god please provide some brain cells to Prof. Dr. R.S. Raja Durai 💢
import { floorMap } from "@/utils/const";

export function parseStartMinutes(time: string): number {
  const [, h, m, p] =
    time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)/)!;
  return ((+h % 12) + (p === "PM" ? 12 : 0)) * 60 + +m;
}


const patterns = [
  // Pattern 1: Bracketed batches like:   "L-18P1WPH532 PCC_LAB__Batch[23A11,23A12] (VNS) CR7"
  /^([LPT])-([A-Z0-9]+)\s+[^\[\]()]*\[([\dA-Z,\/]+)\]\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 2: Slash-separated batches like:  "L-18P1WPH532 23E11/23F11 (VNS) CR7"
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z\/]+)\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 3: Comma-separated or space-separated batches like:  "L-18P1WPH532 23E11/23F11 (VNS) CR7"
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z,]+)\s+\(([^)]+)\)\s+(.+)$/,
];

export function extractTimetableEntry(
  targetBatch: string,
  rawEntries: string[]
) {
  for (const rawEntry of rawEntries) {
    for (const pattern of patterns) {
      const match = rawEntry.match(pattern);
      if (!match) continue;
      const [_, typeCode, courseCode, batches, coordinator, venue] = match;
      if (!batches.includes(targetBatch)) continue;

      return {
        classType: typeCode === "L" ? "Lecture" : typeCode === "P" ? "Practicle" : typeCode === "T" ? "Tutorial" : "Unknown", // will it kill me use if else
        courseCode,
        batches,
        coordinator,
        venue,
        rawEntries,
        floor: floorMap[venue.toUpperCase().replaceAll(/\s|-/g, "")], // I think I should use loop here.
      };

    }
  }

  return null
}
