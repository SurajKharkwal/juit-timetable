"use server"

import clientPromise from "@/db/connect"

const client = await clientPromise
const db = client.db("test")


export async function getCourseData(course: string)  {
  const data = await db
    .collection("btechsem5")
    .find({}, { projection: { _id: 0, __v: 0 } })
    .toArray()

  return data 
  //
  // return data.map(ele => ({
  //   day: ele.day as Day,
  //   time: ele.time as Time,
  //   data: ele.data as string[],
  // }))
}
