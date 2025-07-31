import {
  ELECTIVE_SUBJECTS,
  ELECTIVE_SUBJECTS_CODE,
  ElectiveSubjects,
  ElectiveSubjectsCode,
  floorMap,
} from "@/config/data";

const typeMap = {
  L: "Lecture",
  P: "Practical",
  T: "Tutorial",
} as const;

type TYPE_MAP = keyof typeof typeMap;

export function toDisclude(course: string, minor: string | null): string[] {
  const subjects = ElectiveSubjects[course as ELECTIVE_SUBJECTS];
  if (!subjects.length || !minor) return [];

  return subjects
    .filter((subject) => subject !== minor)
    .flatMap(
      (subject) =>
        ElectiveSubjectsCode[subject as ELECTIVE_SUBJECTS_CODE] || [],
    );
}

const patterns = [
  // Pattern 1: Bracketed batches like: PCC_LAB__Batch[23A11,23A12]
  /^([LPT])-([A-Z0-9]+)\s+[^\[\]()]*\[([\dA-Z,\/]+)\]\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 2: Slash-separated batches like: 23E11/23F11
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z\/]+)\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 3: Comma-separated or space-separated batches
  /^([LPT])-([A-Z0-9]+)\s+([\dA-Z,]+)\s+\(([^)]+)\)\s+(.+)$/,

  // Pattern 4: ALL BATCHES - e.g. L-20B1WCI531 PEC EL-1 Batch-1[ALL BATCHES] (RBT) CR10 also make venue optional for cases such as 5 th sem sat 12
  /^([LPT])-([A-Z0-9]+)[^\[\]()]*\[ALL BATCHES\]\s+\(([^)]+)\)(?:\s+(.+))?$/,
];

export function findClassForBatch(
  batch: string,
  entries: string[],
  toDisclude: string[],
) {
  for (const entry of entries) {
    for (const pattern of patterns) {
      const match = entry.match(pattern);
      if (!match) continue;

      const [_, typeCode, courseCode, arg3, arg4, arg5] = match;

      // Skip if course is in discluded list
      if (toDisclude.includes(courseCode)) continue;

      // Match pattern 4: ALL BATCHES
      if (pattern === patterns[3]) {
        const coordinator = arg3;
        const venue = arg4 ?? ""; // return "" if venue not present
        return {
          type: typeMap[typeCode as TYPE_MAP],
          courseCode,
          batches: ["ALL BATCHES"],
          coordinator,
          venue,
          raw: entry,
          floor: floorMap[venue.toUpperCase().replaceAll(/\s|-/g, "")],
        };
      }
      // Other patterns
      const batchListStr = arg3;
      const coordinator = arg4;
      const venue = arg5;
      const batchList = batchListStr.split(/[\/,]/).map((s) => s.trim());

      if (!batchList.includes(batch)) continue;

      return {
        type: typeMap[typeCode as TYPE_MAP],
        courseCode,
        batches: batchList,
        coordinator,
        venue,
        raw: entry,
        floor: floorMap[venue.toUpperCase().replaceAll(/\s|-/g, "")],
      };
    }
  }

  return null;
}
