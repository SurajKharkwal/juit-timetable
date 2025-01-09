import { DaysMapper, TimeMapper } from "@/lib/db/maps";
import { Model } from "mongoose";

export type MobileData = {
  time: string
  hasClass: boolean
  subject?: string
  teacher?: string
  category?: "Lab" | "Lecture"
  venue?: string
  batches?: string
}

export type DesktopData = {
  day: string,
  items: {
    time: string
    data: string
  }[]
}

export async function modileData(model: Model<any, {}, {}, {}, any, any>, batch: string, day: string) {
  const dbData = await model.aggregate([
    { $match: { day, data: { $elemMatch: { $regex: batch, $options: 'i' } } } },
    {
      $project: {
        _id: 0,
        day: 1,
        time: 1,
        data: {
          $filter: {
            input: "$data",
            as: "item",
            cond: { $regexMatch: { input: "$$item", regex: batch, options: "i" } },
          },
        },
      },
    },
  ])
  const result: MobileData[] = []
  Object.values(TimeMapper).forEach((time) => {
    const data: string = dbData.find(ele => ele.time === time)?.data[0] || "N/A"
    if (data == "N/A") {
      result.push({ time, hasClass: false })
      return
    }
    const [subCode, batches, teacher, venue] = data.split(" ")
    const [categoryType, code] = subCode.split("-")
    const temp: MobileData = {
      time,
      venue,
      teacher,
      batches,
      subject: code,
      hasClass: true,
      category: categoryType == "L" ? "Lecture" : "Lab",
    }
    result.push(temp)
  })
  return result
}

export async function desktopData(model: Model<any, {}, {}, {}, any, any>, batch: string,) {
  const dbData: { day: string, time: string, data: string[] }[] = await model.aggregate([
    { $match: { data: { $elemMatch: { $regex: batch, $options: 'i' } } } },
    {
      $project: {
        _id: 0,
        day: 1,
        time: 1,
        data: {
          $filter: {
            input: "$data",
            as: "item",
            cond: { $regexMatch: { input: "$$item", regex: batch, options: "i" } },
          },
        },
      },
    },
  ]);
  const result: DesktopData[] = []
  Object.values(DaysMapper).forEach(day => {
    const temp: DesktopData = {
      day,
      items: []
    }
    Object.values(TimeMapper).forEach(time => {
      const q = dbData.find(ele => ele.time == time && ele.day == day)
      temp.items.push({ time, data: q ? q.data[0] : "" })
    })
    result.push(temp)
  })
  return result
}
