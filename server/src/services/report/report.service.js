class ReportService {
  build(records, errors, warnings) {
    const invalidRows = new Set(errors.map(error => error.row));

    return {
      summary: {
        status: errors.length ? "FAILED" : "PASSED",
        message:
          errors.length
            ? "Validation completed with errors."
            : "Validation completed successfully.",
      },

      statistics: {
        totalRecords: records.length,
        validRecords: records.length - invalidRows.size,
        invalidRecords: invalidRows.size,
        duplicateRecords: errors.filter(
          error => error.type === "DUPLICATE"
        ).length,
        warningCount: warnings.length,
      },

      errors,
      warnings,
    };
  }
}

export default new ReportService();