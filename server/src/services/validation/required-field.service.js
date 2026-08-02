import VALIDATION_FIELDS from "../../constants/validationFields.js";
import VALIDATION_TYPES from "../../constants/validationTypes.js";
import VALIDATION_SEVERITY from "../../constants/validationSeverity.js";

class RequiredFieldService {
  validate(records) {
    const errors = [];

    records.forEach((record, index) => {
      const row = index + 2;

      this.validateField(
        record.name,
        VALIDATION_FIELDS.NAME,
        row,
        errors
      );

      this.validateField(
        record.phone,
        VALIDATION_FIELDS.PHONE,
        row,
        errors
      );

      this.validateField(
        record.nin,
        VALIDATION_FIELDS.NIN,
        row,
        errors
      );
    });

    return {
      errors,
    };
  }

  validateField(value, field, row, errors) {
    const normalizedValue = String(value ?? "").trim();

    if (!normalizedValue) {
      errors.push({
        row,
        field,
        value,
        type: VALIDATION_TYPES.REQUIRED,
        severity: VALIDATION_SEVERITY.ERROR,
        message: `${field} is required.`,
      });
    }
  }
}

export default new RequiredFieldService();