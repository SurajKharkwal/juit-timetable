import { DaysMapper } from "@/config/data";
import { WorkSheet } from "xlsx";

export type Record = {
  day: string;
  time: string;
  data: string[];
};
export default function parser(sheet: WorkSheet) {
  const record: Record[] = [];
  for (
    let col = "B";
    col < "J";
    col = String.fromCharCode(col.charCodeAt(0) + 1)
  ) {
    for (let dayIndex = 0; dayIndex < 6; dayIndex++) {
      const index = 15 * dayIndex + 3 + dayIndex;
      const temp: Record = {
        day: DaysMapper[dayIndex as keyof typeof DaysMapper],
        data: [],
        time: sheet[`${col}2`].v
          .replace(/\s*/g, "") // Remove all spaces
          .replace(
            /(\d{1,2}:\d{2})(AM|PM)-(\d{1,2}:\d{2})(AM|PM)/i,
            "$1 $2 - $3 $4",
          ), // Format time properly
      };
      for (let row = index; row <= index + 15; row++) {
        const cellValue = String(sheet[`${col}${row}`].v).replace(/\s+/g, " ");
        if (cellValue) {
          const finalValue = cellValue.replace(/\s*,\s*/g, ","); // Remove spaces around commas
          temp.data.push(finalValue);
        }
      }
      record.push(temp);
    }
  }
  return record;
}
