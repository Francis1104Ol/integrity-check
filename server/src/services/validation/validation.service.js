import RequiredFieldService from "./required-field.service.js";
import DuplicateService from "./duplicate.service.js";
import FormatValidationService from "./format-validation.service.js";
import ReportService from "../report/report.service.js";

class ValidationService {
  validate(records) {
    const errors = [];
    const warnings = [];

    // Required fields
    const requiredResult =
      RequiredFieldService.validate(records);

    errors.push(...requiredResult.errors);

    // Duplicate detection
    const duplicateResult =
      DuplicateService.detect(records);

    errors.push(...duplicateResult.errors);
    warnings.push(...duplicateResult.warnings);

    // Format validation
    const formatResult =
      FormatValidationService.validate(records);

    errors.push(...formatResult.errors);

    // Build final report
    return ReportService.build(
      records,
      errors,
      warnings
    );
  }
}

export default new ValidationService();