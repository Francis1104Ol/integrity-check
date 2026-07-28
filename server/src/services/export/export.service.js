import PDFDocument from "pdfkit";

class ExportService {
  async generatePdf(dataset) {
    return new Promise((resolve, reject) => {
      const doc = new PDFDocument({
        margin: 50,
        size: "A4",
      });

      const buffers = [];

      doc.on("data", (chunk) => buffers.push(chunk));

      doc.on("end", () => {
        resolve(Buffer.concat(buffers));
      });

      doc.on("error", reject);

      // ========= HEADER =========
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
  `Uploaded By: ${
    dataset.uploadedBy.firstName
  } ${dataset.uploadedBy.lastName}`
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

doc
  .fontSize(14)
  .font("Helvetica-Bold")
  .text("Validation Errors");

doc.moveDown();

doc.font("Helvetica");

if (dataset.report.errors.length === 0) {
  doc.text("No validation errors.");
} else {
  dataset.report.errors.forEach((error) => {
  doc
    .font("Helvetica-Bold")
    .text(`Row ${error.row}`);

  doc.font("Helvetica");

  doc.text(`Field : ${error.field}`);

  doc.text(`Type  : ${error.type}`);

  doc.text(`Message: ${error.message}`);

  doc.moveDown();
});
}

doc.moveDown();

doc
  .fontSize(14)
  .font("Helvetica-Bold")
  .text("Warnings");

doc.moveDown();

doc.font("Helvetica");

if (dataset.report.warnings.length === 0) {
  doc.text("No warnings.");
} else {
  dataset.report.warnings.forEach((warning) => {
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
}

export default new ExportService();