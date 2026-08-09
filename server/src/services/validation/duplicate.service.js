import VALIDATION_FIELDS from "../../constants/validationFields.js";
import VALIDATION_TYPES from "../../constants/validationTypes.js";
import VALIDATION_SEVERITY from "../../constants/validationSeverity.js";

class DuplicateService {
  detect(records) {
    const errors = [];
    const warnings = [];

    const seenNins = new Map();
    const seenPhones = new Map();
    const seenCoordinates = new Map();

    records.forEach((record, index) => {
      const row = index + 2;

      const nin = String(record.nin ?? "").trim();

      const phone = String(record.phone ?? "")
        .trim()
        .replace(/[\s-]/g, "");

      const coordinate = String(
        record.farmCoordinate ?? ""
      ).trim();

      // Duplicate NIN
      if (nin) {
        if (seenNins.has(nin)) {
          errors.push({
            row,
            field: VALIDATION_FIELDS.NIN,
            value: nin,
            type: VALIDATION_TYPES.DUPLICATE,
            severity: VALIDATION_SEVERITY.ERROR,
            message: `Duplicate NIN. First found in row ${seenNins.get(
              nin
            )}.`,
          });
        } else {
          seenNins.set(nin, row);
        }
      }

      // Duplicate Phone
      if (phone) {
        if (seenPhones.has(phone)) {
          errors.push({
            row,
            field: VALIDATION_FIELDS.PHONE,
            value: phone,
            type: VALIDATION_TYPES.DUPLICATE,
            severity: VALIDATION_SEVERITY.ERROR,
            message: `Duplicate phone number. First found in row ${seenPhones.get(
              phone
            )}.`,
          });
        } else {
          seenPhones.set(phone, row);
        }
      }

      // Duplicate Coordinates
      if (coordinate) {
        if (seenCoordinates.has(coordinate)) {
          warnings.push({
            row,
            field: VALIDATION_FIELDS.FARM_COORDINATE,
            value: coordinate,
            type: VALIDATION_TYPES.DUPLICATE,
            severity: VALIDATION_SEVERITY.WARNING,
            message: `Duplicate farm coordinate. First found in row ${seenCoordinates.get(
              coordinate
            )}.`,
          });
        } else {
          seenCoordinates.set(coordinate, row);
        }
      }
    });

    return {
      errors,
      warnings,
    };
  }
}

export default new DuplicateService();