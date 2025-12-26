export const DAYS = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
] as const;

const evenSem = process.env.NEXT_PUBLIC_EVEN_SEM === "true"

export const TIMES = [
  "09:00 AM - 09:55 AM",
  "10:00 AM - 10:55 AM",
  "11:00 AM - 11:55 AM",
  "12:00 PM - 12:55 PM",
  "01:00 PM - 01:55 PM",
  "02:00 PM - 02:55 PM",
  "03:00 PM - 03:55 PM",
  "04:00 PM - 04:55 PM",
  "05:00 PM - 05:55 PM",
];

export const COURSES = evenSem
  ? ["BTECH SEM 2", "BTECH SEM 4", "BTECH SEM 6", "BTECH SEM 8"]
  : ["BTECH SEM 1", "BTECH SEM 3", "BTECH SEM 5", "BTECH SEM 7"]

export const floorMap: Record<string, string> = {
  // Ground Floor
  CR3: "Ground Floor",
  CR4: "Ground Floor",
  CL7: "Ground Floor",
  CL8: "Ground Floor",
  LT1: "Ground Floor",
  LT2: "Ground Floor",
  LRC: "Ground Floor",
  Amphitheatre: "Ground Floor",
  // First Floor
  CL9: "First Floor",
  CL10: "First Floor",
  CL11: "First Floor",
  TR1: "First Floor",
  TR2: "First Floor",
  TR3: "First Floor",
  TR4: "First Floor",
  CR5: "First Floor",
  CR6: "First Floor",
  CR7: "First Floor",
  CR8: "First Floor",
  CR9: "First Floor",
  CR10: "First Floor",
  LT3: "First Floor",
  // Second Floor
  CR11: "Second Floor",
  CR12: "Second Floor",
  CL1: "Second Floor",
  TR5: "Second Floor",
  TR6: "Second Floor",
  TR7: "Second Floor",
  // Third Floor
  CL3: "Third Floor",
  CL4: "Third Floor",
  CL5: "Third Floor",
  CL6: "Third Floor",
  CL12: "Third Floor",
  // Fourth Floor
  CR16: "Fourth Floor",
  CR17: "Fourth Floor",
  CR18: "Fourth Floor",
  CR19: "Fourth Floor",
  // Lower Level 1
  CR1: "Lower Level 1",
  CR2: "Lower Level 1",
};
