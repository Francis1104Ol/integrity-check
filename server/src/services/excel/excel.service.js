import xlsx from "xlsx";
import ApiError from "../../utils/ApiError.js";

class ExcelService {
  /**
   * Read the uploaded Excel file
   */
  read(filePath) {
    try {
      const workbook = xlsx.readFile(filePath);

      if (!workbook.SheetNames.length) {
        throw new ApiError(
          400,
          "The uploaded Excel file contains no worksheets."
        );
      }

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      return xlsx.utils.sheet_to_json(worksheet, {
        defval: "",
        raw: false,
        trim: true,
      });
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        "Failed to read Excel file."
      );
    }
  }

  /**
   * Get a specific row from the uploaded Excel file
   */
  getRow(filePath, rowNumber) {
    try {
      if (!Number.isInteger(rowNumber) || rowNumber < 2) {
        throw new ApiError(
          400,
          "Invalid row number."
        );
      }

      const workbook = xlsx.readFile(filePath);

      if (!workbook.SheetNames.length) {
        throw new ApiError(
          400,
          "The uploaded Excel file contains no worksheets."
        );
      }

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      if (!worksheet) {
        throw new ApiError(
          400,
          "Unable to read the first worksheet."
        );
      }

      const rows = xlsx.utils.sheet_to_json(
        worksheet,
        {
          defval: "",
          raw: false,
          trim: true,
          header: 1,
        }
      );

      const header = rows[0];

      if (!header) {
        throw new ApiError(
          400,
          "The uploaded Excel file contains no headers."
        );
      }

      const dataRow = rows[rowNumber - 1];

      if (!dataRow) {
        throw new ApiError(
          404,
          `Row ${rowNumber} does not exist in the dataset.`
        );
      }

      const row = {};

      header.forEach((column, index) => {
        row[column] = dataRow[index] ?? "";
      });

      return {
        rowNumber,
        data: row,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(
        500,
        "Failed to read dataset row."
      );
    }
  }
}

export default new ExcelService();