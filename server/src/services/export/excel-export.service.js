import ExcelJS from "exceljs";

class ExcelExportService {
  async generate(dataset) {
    const workbook = new ExcelJS.Workbook();

    /*
     * ===========================
     * Summary Sheet
     * ===========================
     */

    const summary = workbook.addWorksheet("Summary");

    summary.columns = [
      { header: "Metric", width: 35 },
      { header: "Value", width: 25 },
    ];

    const report = dataset.report;

    summary.addRows([
      ["Dataset", dataset.name],
      ["Status", report.summary.status],
      ["Health Score", report.summary.healthScore + "%"],
      ["Total Records", report.summary.totalRecords],
      ["Valid Records", report.summary.validRecords],
      ["Invalid Records", report.summary.invalidRecords],
      ["Warning Records", report.summary.warningRecords],
    ]);

    /*
     * ===========================
     * Statistics Sheet
     * ===========================
     */

    const statistics = workbook.addWorksheet("Statistics");

    statistics.columns = [
      { header: "Statistic", width: 35 },
      { header: "Count", width: 20 },
    ];

    Object.entries(report.statistics).forEach(([key, value]) => {
      statistics.addRow([key, value]);
    });

    /*
     * ===========================
     * Errors Sheet
     * ===========================
     */

    const errors = workbook.addWorksheet("Errors");

    errors.columns = [
      { header: "Row", width: 10 },
      { header: "Field", width: 20 },
      { header: "Value", width: 25 },
      { header: "Severity", width: 15 },
      { header: "Type", width: 20 },
      { header: "Message", width: 50 },
    ];

    report.errors.forEach((error) => {
      errors.addRow([
        error.row,
        error.field,
        error.value,
        error.severity,
        error.type,
        error.message,
      ]);
    });

    /*
     * ===========================
     * Warnings Sheet
     * ===========================
     */

    const warnings = workbook.addWorksheet("Warnings");

    warnings.columns = [
      { header: "Row", width: 10 },
      { header: "Field", width: 20 },
      { header: "Value", width: 25 },
      { header: "Severity", width: 15 },
      { header: "Type", width: 20 },
      { header: "Message", width: 50 },
    ];

    report.warnings.forEach((warning) => {
      warnings.addRow([
        warning.row,
        warning.field,
        warning.value,
        warning.severity,
        warning.type,
        warning.message,
      ]);
    });

    return workbook.xlsx.writeBuffer();
  }
}

export default new ExcelExportService();