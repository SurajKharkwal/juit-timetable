import ExcelJs from 'exceljs'
import { writeFile } from 'fs'
import { courseNames } from './course-name'

// Define the Class type as a JSDoc typedef
/**
 * @typedef {Object} Class
 * @property {string} value
 * @property {number} colNumber
 */

// Define the TimeTableData type as a JSDoc typedef
/**
 * @typedef {Object.<string, Class[]>} TimeTableData
 */

const classType = {
    "T": "Tutorial",
    "L": "Lecture",
    "P": "Lab",
}

const readAndWrite = async () => {
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile("./timetable.xlsx");

    /** @type {TimeTableData} */
    let data = {};

    workbook.eachSheet((sheet, id) => {
        if (id !== 1) {
            data[sheet.name] = [];
            sheet.eachRow(row => {
                row.eachCell((cell, colNumber) => {
                    let cellValue = String(cell.value);
                    const cellData = cellValue.split(" ").filter(value => value != "");
                    if (cellData[0].length >= 8) {
                        const courseCode = cellData[0].slice(2);
                        if (courseNames[courseCode]) {
                            cellData[0] = courseNames[courseCode]
                        }
                        cellData.push(classType[cellValue.charAt(0)]);
                    }
                    // cellData[0].charAt(0)
                    cellValue = cellData.join(' ');
                    if (cellValue !== "") {
                        let classData = {
                            value: cellValue,
                            colNumber
                        };
                        data[sheet.name].push(classData);
                    }
                });
            });
        }
    });

    const jsonData = JSON.stringify(data, null, 2);
    const filePath = "./time-table.js";
    const writeImportStatement = 'import {TimeTableData} from "./writeTimeTable"'
    writeFile(filePath, `${writeImportStatement}\nexport const timeTable:TimeTableData = ${jsonData}`, (err) => {

        if (err) {
            console.log(err);
        } else {
            console.log("data written");
        }
    });
};

//module.exports = readAndWrite;
readAndWrite();

