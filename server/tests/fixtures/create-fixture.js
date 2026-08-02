import ExcelJS from "exceljs";
import path from "path";
import fs from "fs";

const workbook = new ExcelJS.Workbook();
const worksheet = workbook.addWorksheet("Farmers");

worksheet.columns = [
  { header: "Farmer Name", key: "name", width: 25 },
  { header: "Phone Number", key: "phone", width: 20 },
  { header: "NIN", key: "nin", width: 25 },
  { header: "Farm Coordinate", key: "coordinate", width: 25 },
];

worksheet.addRows([
  {
    name: "John Doe",
    phone: "08012345678",
    nin: "12345678901",
    coordinate: "7.123,3.456",
  },
  {
    name: "Jane Smith",
    phone: "08087654321",
    nin: "12345678902",
    coordinate: "7.124,3.457",
  },
  {
    name: "John Doe",
    phone: "08012345678",
    nin: "12345678901",
    coordinate: "7.123,3.456",
  },
  {
    name: "Mary Johnson",
    phone: "08011112222",
    nin: "12345678903",
    coordinate: "7.125,3.458",
  },
]);

// Ensure the fixtures directory exists
const fixturesDir = path.resolve("tests/fixtures");
fs.mkdirSync(fixturesDir, { recursive: true });

// Output file
const output = path.join(fixturesDir, "sample-dataset.xlsx");

await workbook.xlsx.writeFile(output);

console.log("✅ Test fixture created:");
console.log(output);