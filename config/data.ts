export const Courses = [
  "BTECH 1 SEM",
  "BTECH 2 SEM",
  "BTECH 3 SEM",
  "BTECH 4 SEM",
  "BTECH 5 SEM",
  "BTECH 6 SEM",
  "MTECH-MSc 1 SEM",
  "MTECH-MSc 2 SEM",
  "MTECH-MSc 3 SEM, PhD2",
  "MTECH-MSc 4 SEM, PhD2",
];

export const ElectiveSubjects = {
  "BTECH 1 SEM": [],
  "BTECH 2 SEM": [],
  "BTECH 3 SEM": [],
  "BTECH 4 SEM": [],
  "BTECH 5 SEM": ["CLOUD COMPUTING", "DATA SCIENCE", "PROMPT ENGINEERING"],
  "BTECH 6 SEM": [],
  "BTECH 7 SEM": [],
  "BTECH 8 SEM": [],
  "MTECH-MSc 1 SEM": [],
  "MTECH-MSc 2 SEM": [],
  "MTECH-MSc 3 SEM, PhD2": [],
  "MTECH-MSc 4 SEM, PhD2": [],
};

export type ELECTIVE_SUBJECTS = keyof typeof ElectiveSubjects;

export const ElectiveSubjectsCode = {
  "PROMPT ENGINEERING": ["25B1WCI511", "25B1WCI571"], // lecture and lab
  "DATA SCIENCE": ["20B1WCI531", "20B1WCI571"],
  "CLOUD COMPUTING": ["20B1WCI532", "20B1WCI572"],
};

export type ELECTIVE_SUBJECTS_CODE = keyof typeof ElectiveSubjectsCode;

export const HomePageAlert = {
  title: "Found some Bugs?",
  description: "Report them on GitHub. Contributions are welcome.",
};
export const UpdatePageAlert = {
  title: "Timetable Update Section",
  description:
    "Don't spam. If you need access but don’t have the password, feel free to email us.",
};

export const DaysMapper = {
  0: "MONDAY",
  1: "TUESDAY",
  2: "WEDNESDAY",
  3: "THURSDAY",
  4: "FRIDAY",
  5: "SATURDAY",
};

export const TimeMapper = {
  "0": "09:00 AM - 09:55 AM",
  "1": "10:00 AM - 10:55 AM",
  "2": "11:00 AM - 11:55 AM",
  "3": "12:00 PM - 12:55 PM",
  "4": "01:00 PM - 01:55 PM",
  "5": "02:00 PM - 02:55 PM",
  "6": "03:00 PM - 03:55 PM",
  "7": "04:00 PM - 04:55 PM",
};

export const TimeSlots = [
  "09:00 AM - 09:55 AM",
  "10:00 AM - 10:55 AM",
  "11:00 AM - 11:55 AM",
  "12:00 PM - 12:55 PM",
  "01:00 PM - 01:55 PM",
  "02:00 PM - 02:55 PM",
  "03:00 PM - 03:55 PM",
  "04:00 PM - 04:55 PM",
];

export const Days = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
];

export const LocalStorageKeys = {
  batch: "JUIT_TIME_TABLE:batch",
  course: "JUIT_TIME_TABLE:course",
  minor: "JUIT_TIME_TABLE:minor",
} as const;

export const floorMap: { [key: string]: string } = {
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
