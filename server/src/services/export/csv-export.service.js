class CsvExportService {
  generate(dataset) {
    const rows = [];

    // CSV Header
    rows.push([
      "Row",
      "Field",
      "Value",
      "Severity",
      "Type",
      "Message",
    ]);

    const validations = [
      ...(dataset.report?.errors ?? []),
      ...(dataset.report?.warnings ?? []),
    ];

    validations.forEach((validation) => {
      rows.push([
        validation.row,
        validation.field,
        validation.value ?? "",
        validation.severity,
        validation.type,
        validation.message,
      ]);
    });

    return rows
      .map((row) =>
        row
          .map((value) => {
            const cell = String(value ?? "");

            // Escape quotes
            const escaped = cell.replace(/"/g, '""');

            // Wrap values containing commas, quotes, or newlines
            if (/[",\n]/.test(escaped)) {
              return `"${escaped}"`;
            }

            return escaped;
          })
          .join(",")
      )
      .join("\n");
  }
}

export default new CsvExportService();