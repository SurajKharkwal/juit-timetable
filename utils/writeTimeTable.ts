"use server"
import * as ExcelJs from 'exceljs'
import { writeFile } from 'fs'

interface Class {
    value: string,
    colNumber: number
}

export interface TimeTableData {
    [key: string]: Class[]
}

const readAndWrite = async () => {
    console.log("function ran")
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("public/timeTable.xlsx");
    console.log("file opened")

    let data: TimeTableData = {
    }

    workbook.eachSheet((sheet, id) => {
        if (id != 1) {
            data[sheet.name] = [];
            sheet.eachRow(row => {
                row.eachCell((cell, colNumber) => {
                    const cellValue = String(cell.value);
                    if (cellValue !== "") {
                        let classData: Class = {
                            value: cellValue,
                            colNumber
                        }
                        data[sheet.name].push(classData);
                    }
                })
            })
        }
    })

    const jsonData = JSON.stringify(data, null, 2);
    const filePath = "./time-table.ts"
    const writeImportStatement = 'import {TimeTableData} from "./writeTimeTable"'
    writeFile(filePath, `${writeImportStatement}\nexport const timeTable:TimeTableData = ${jsonData}`, (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("data written")
        }
    })
}

export default readAndWrite 
