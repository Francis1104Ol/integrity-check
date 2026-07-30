import PDFDocument from "pdfkit";
import CsvExportService from "./csv-export.service.js";
import ExcelExportService from "./excel-export.service.js";

class ExportService {
  /**
   * Generate PDF report
   */
  async generatePdf(dataset) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
      });

      const buffers = [];

      doc.on("data", chunk => buffers.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      doc.on("error", reject);

      // ==========================
      // HEADER
      // ==========================

      doc
        .fontSize(22)
        .font("Helvetica-Bold")
        .text("IntegrityCheck", {
          align: "center",
        });

      doc
        .moveDown()
        .fontSize(16)
        .font("Helvetica")
        .text("Dataset Validation Report", {
          align: "center",
        });

      doc.moveDown(2);

      // ==========================
      // DATASET INFO
      // ==========================

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Dataset Information");

      doc.moveDown();

      doc.font("Helvetica");

      doc.text(`Dataset Name: ${dataset.name}`);

      doc.text(
        `Original File: ${dataset.originalFileName}`
      );

      doc.text(
        `Uploaded By: ${dataset.uploadedBy.firstName} ${dataset.uploadedBy.lastName}`
      );

      doc.text(
        `Validation Status: ${dataset.report.summary.status}`
      );

      doc.text(
        `Validated At: ${
          dataset.validatedAt
            ? new Date(dataset.validatedAt).toLocaleString()
            : "N/A"
        }`
      );

      doc.moveDown(2);

      // ==========================
      // STATISTICS
      // ==========================

      const stats = dataset.report.statistics;

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Validation Statistics");

      doc.moveDown();

      doc.font("Helvetica");

      doc.text(`Total Records: ${stats.totalRecords}`);
      doc.text(`Valid Records: ${stats.validRecords}`);
      doc.text(`Invalid Records: ${stats.invalidRecords}`);
      doc.text(`Duplicate Records: ${stats.duplicateRecords}`);
      doc.text(`Warnings: ${stats.warningCount}`);

      doc.moveDown(2);

      // ==========================
      // ERRORS
      // ==========================

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Validation Errors");

      doc.moveDown();

      doc.font("Helvetica");

      if (!dataset.report.errors.length) {
        doc.text("No validation errors.");
      } else {
        dataset.report.errors.forEach(error => {
          doc
            .font("Helvetica-Bold")
            .text(`Row ${error.row}`);

          doc.font("Helvetica");

          doc.text(`Field: ${error.field}`);
          doc.text(`Type: ${error.type}`);
          doc.text(`Message: ${error.message}`);

          doc.moveDown();
        });
      }

      doc.moveDown();

      // ==========================
      // WARNINGS
      // ==========================

      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("Warnings");

      doc.moveDown();

      doc.font("Helvetica");

      if (!dataset.report.warnings.length) {
        doc.text("No warnings.");
      } else {
        dataset.report.warnings.forEach(warning => {
          doc.text(
            `Row ${warning.row} | ${warning.field}`
          );

          doc.text(warning.message);

          doc.moveDown();
        });
      }

      doc.end();
    });
  }

  /**
   * Generate CSV report
   */
  generateCsv(dataset) {
    return CsvExportService.generate(dataset);
  }

  /**
   * Generate Excel report
   */
  async generateExcel(dataset) {
    return ExcelExportService.generate(dataset);
  }
}

export default new ExportService();