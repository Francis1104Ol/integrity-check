import VALIDATION_FIELDS from "../../constants/validationFields.js";
import VALIDATION_TYPES from "../../constants/validationTypes.js";
import VALIDATION_STATUS from "../../constants/validationStatus.js";
class ReportService {
  build(records, errors, warnings) {
    const invalidRows = new Set(errors.map(error => error.row));
    const warningRows = new Set(warnings.map(warning => warning.row));

    const statistics = this.buildStatistics(errors, warnings);

    const summary = {
      status: errors.length ? VALIDATION_STATUS.FAILED : VALIDATION_STATUS.PASSED,

      message: errors.length
        ? "Validation completed with errors."
        : "Validation completed successfully.",

      totalRecords: records.length,

      validRecords:
        records.length - invalidRows.size,

      invalidRecords:
        invalidRows.size,

      warningRecords:
        warningRows.size,

      healthScore: this.calculateHealthScore(
        records.length,
        invalidRows.size
      ),
    };

    return {
      summary,
      statistics,
      errors,
      warnings,
    };
  }

  buildStatistics(errors, warnings) {
    return {
      totalErrors: errors.length,

      totalWarnings: warnings.length,

      requiredFields: this.countErrorsByType(
        errors,
        VALIDATION_TYPES.REQUIRED
      ),

      duplicateRecords: this.countErrorsByType(
        errors,
        VALIDATION_TYPES.DUPLICATE
      ),

      invalidFormats: this.countErrorsByType(
        errors,
        VALIDATION_TYPES.INVALID_FORMAT
      ),

      duplicateNin: this.countErrors(
        errors,
        VALIDATION_FIELDS.NIN,
        VALIDATION_TYPES.DUPLICATE
      ),

      duplicatePhone: this.countErrors(
        errors,
        VALIDATION_FIELDS.PHONE,
        VALIDATION_TYPES.DUPLICATE
      ),

      duplicateCoordinates: this.countWarnings(
        warnings,
        VALIDATION_FIELDS.FARM_COORDINATE,
        VALIDATION_TYPES.DUPLICATE
      ),

      invalidNin: this.countErrors(
        errors,
        VALIDATION_FIELDS.NIN,
        VALIDATION_TYPES.INVALID_FORMAT
      ),

      invalidPhone: this.countErrors(
        errors,
        VALIDATION_FIELDS.PHONE,
        VALIDATION_TYPES.INVALID_FORMAT
      ),

      invalidCoordinates: this.countErrors(
        errors,
        VALIDATION_FIELDS.FARM_COORDINATE,
        VALIDATION_TYPES.INVALID_FORMAT
      ),
    };
  }

  countErrors(errors, field, type) {
    return errors.filter(
      error =>
        error.field === field &&
        error.type === type
    ).length;
  }

  countWarnings(warnings, field, type) {
    return warnings.filter(
      warning =>
        warning.field === field &&
        warning.type === type
    ).length;
  }

  countErrorsByType(errors, type) {
    return errors.filter(
      error => error.type === type
    ).length;
  }

  calculateHealthScore(total, invalid) {
    if (total === 0) return 100;

    return Math.round(
      ((total - invalid) / total) * 100
    );
  }
}

export default new ReportService();