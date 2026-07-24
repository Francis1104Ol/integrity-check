import ReportService from "../report/report.service.js"
class ValidationService {
  validate(records) {
    const errors = [];
    const warnings = [];

    // Validation Rules
   // Validation Rules
this.checkRequiredFields(records, errors);

this.checkDuplicateNIN(records, errors);
this.checkDuplicatePhone(records, errors);
this.checkDuplicateCoordinates(records, warnings);

this.checkNINFormat(records, errors);
this.checkPhoneFormat(records, errors);
this.checkCoordinateFormat(records, errors);
    // Count unique invalid rows
    const invalidRows = new Set(errors.map((error) => error.row));

    return ReportService.build(records, errors, warnings);

  }
  checkNINFormat(records, errors) {
  records.forEach((record, index) => {
    if (!record.nin) return;

    const nin = String(record.nin).trim();

    if (!/^\d{11}$/.test(nin)) {
      errors.push({
        row: index + 2,
        field: "nin",
        type: "INVALID_FORMAT",
        message: "NIN must contain exactly 11 digits.",
      });
    }
  });
}
  checkRequiredFields(records, errors) {
    const requiredFields = [
      "name",
      "phone",
      "nin",
    ];

    records.forEach((record, index) => {
      requiredFields.forEach((field) => {
        if (!record[field]) {
          errors.push({
            row: index + 2,
            field,
            type: "REQUIRED",
            message: `${field} is required.`,
          });
        }
      });
    });
  }

  checkDuplicateNIN(records, errors) {
    const seen = new Map();

    records.forEach((record, index) => {
      if (!record.nin) return;

      if (seen.has(record.nin)) {
        errors.push({
          row: index + 2,
          field: "nin",
          type: "DUPLICATE",
          message: `Duplicate NIN. First found in row ${seen.get(record.nin)}.`,
        });
      } else {
        seen.set(record.nin, index + 2);
      }
    });
  }

  checkDuplicatePhone(records, errors) {
    const seen = new Map();

    records.forEach((record, index) => {
      if (!record.phone) return;

      if (seen.has(record.phone)) {
        errors.push({
          row: index + 2,
          field: "phone",
          type: "DUPLICATE",
          message: `Duplicate phone number. First found in row ${seen.get(record.phone)}.`,
        });
      } else {
        seen.set(record.phone, index + 2);
      }
    });
  }

  checkDuplicateCoordinates(records, warnings) {
    const seen = new Map();

    records.forEach((record, index) => {
      if (!record.farmCoordinate) return;

      if (seen.has(record.farmCoordinate)) {
        warnings.push({
          row: index + 2,
          field: "farmCoordinate",
          type: "DUPLICATE",
          message: `Duplicate farm coordinate. First found in row ${seen.get(record.farmCoordinate)}.`,
        });
      } else {
        seen.set(record.farmCoordinate, index + 2);
      }
    });
  }

  checkPhoneFormat(records, errors) {
  records.forEach((record, index) => {
    if (!record.phone) return;

    const phone = String(record.phone).trim();

    const validPhone =
      /^(0\d{10}|234\d{10})$/.test(phone);

    if (!validPhone) {
      errors.push({
        row: index + 2,
        field: "phone",
        type: "INVALID_FORMAT",
        message: "Invalid Nigerian phone number.",
      });
    }
  });
}

checkCoordinateFormat(records, errors) {
  records.forEach((record, index) => {
    if (!record.farmCoordinate) return;

    const parts = String(record.farmCoordinate)
      .split(",")
      .map(value => value.trim());

    if (parts.length !== 2) {
      errors.push({
        row: index + 2,
        field: "farmCoordinate",
        type: "INVALID_FORMAT",
        message: "Farm coordinate must be in 'latitude,longitude' format.",
      });

      return;
    }

    const latitude = Number(parts[0]);
    const longitude = Number(parts[1]);

    const validLatitude =
      !isNaN(latitude) &&
      latitude >= -90 &&
      latitude <= 90;

    const validLongitude =
      !isNaN(longitude) &&
      longitude >= -180 &&
      longitude <= 180;

    if (!validLatitude || !validLongitude) {
      errors.push({
        row: index + 2,
        field: "farmCoordinate",
        type: "INVALID_FORMAT",
        message: "Invalid GPS coordinate.",
      });
    }
  });
}
}

export default new ValidationService();