import VALIDATION_FIELDS from "../../constants/validationFields.js";
import VALIDATION_TYPES from "../../constants/validationTypes.js";
import VALIDATION_SEVERITY from "../../constants/validationSeverity.js";

class FormatValidationService {
  validate(records) {
    const errors = [];

    records.forEach((record, index) => {
      const row = index + 2;

      this.validateNIN(record, row, errors);
      this.validatePhone(record, row, errors);
      this.validateCoordinate(record, row, errors);
    });

    return {
      errors,
    };
  }

  validateNIN(record, row, errors) {
    const nin = String(record.nin ?? "").trim();

    if (!nin) return;

    if (!/^\d{11}$/.test(nin)) {
      errors.push({
        row,
        field: VALIDATION_FIELDS.NIN,
        value: nin,
        type: VALIDATION_TYPES.INVALID_FORMAT,
        severity: VALIDATION_SEVERITY.ERROR,
        message: "NIN must contain exactly 11 digits.",
      });
    }
  }

  validatePhone(record, row, errors) {
    const phone = String(record.phone ?? "").trim();

    if (!phone) return;

    const normalizedPhone = phone.replace(/[\s-]/g, "");

    const validPhone =
      /^0\d{10}$/.test(normalizedPhone) ||
      /^234\d{10}$/.test(normalizedPhone) ||
      /^\d{10}$/.test(normalizedPhone);

    if (!validPhone) {
      errors.push({
        row,
        field: VALIDATION_FIELDS.PHONE,
        value: phone,
        type: VALIDATION_TYPES.INVALID_FORMAT,
        severity: VALIDATION_SEVERITY.ERROR,
        message: "Invalid Nigerian phone number.",
      });
    }
  }

  validateCoordinate(record, row, errors) {
    const coordinate = String(
      record.farmCoordinate ?? ""
    ).trim();

    if (!coordinate) return;

    const parts = coordinate
      .split(",")
      .map((part) => part.trim());

    if (parts.length !== 2) {
      errors.push({
        row,
        field: VALIDATION_FIELDS.FARM_COORDINATE,
        value: coordinate,
        type: VALIDATION_TYPES.INVALID_FORMAT,
        severity: VALIDATION_SEVERITY.ERROR,
        message:
          "Farm coordinate must be in 'latitude,longitude' format.",
      });

      return;
    }

    const latitude = Number(parts[0]);
    const longitude = Number(parts[1]);

    const validLatitude =
      !Number.isNaN(latitude) &&
      latitude >= -90 &&
      latitude <= 90;

    const validLongitude =
      !Number.isNaN(longitude) &&
      longitude >= -180 &&
      longitude <= 180;

    if (!validLatitude || !validLongitude) {
      errors.push({
        row,
        field: VALIDATION_FIELDS.FARM_COORDINATE,
        value: coordinate,
        type: VALIDATION_TYPES.INVALID_FORMAT,
        severity: VALIDATION_SEVERITY.ERROR,
        message: "Invalid GPS coordinate.",
      });
    }
  }
}

export default new FormatValidationService();