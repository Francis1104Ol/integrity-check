import xlsx from "xlsx";
import ApiError from "../../utils/ApiError.js";

class ExcelService {
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
}

export default new ExcelService();