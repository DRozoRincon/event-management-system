import * as XLSX from "xlsx";
import * as fs from "fs";

export class Xlsx {
  constructor(private readonly xlsx = XLSX) {}

  getExcelInJsonFormat(path: string): any[] {
    const file = fs.readFileSync(path);
    const workbook = this.xlsx.read(file, { type: "buffer" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const json = this.xlsx.utils.sheet_to_json(worksheet);

    return json;
  }
}
