class DuplicateService {
  detect(records) {
    const errors = [];
    const warnings = [];

    const seenNins = new Map();
    const seenPhones = new Map();
    const seenCoordinates = new Map();

    records.forEach((record, index) => {
      const row = index + 2; // Excel row number

      // ------------------------
      // Duplicate NIN
      // ------------------------
      if (record.nin) {
        if (seenNins.has(record.nin)) {
          errors.push({
            row,
            field: "nin",
            type: "DUPLICATE",
            message: `Duplicate NIN. First found in row ${seenNins.get(record.nin)}.`,
          });
        } else {
          seenNins.set(record.nin, row);
        }
      }

      // ------------------------
      // Duplicate Phone
      // ------------------------
      if (record.phone) {
        if (seenPhones.has(record.phone)) {
          errors.push({
            row,
            field: "phone",
            type: "DUPLICATE",
            message: `Duplicate phone number. First found in row ${seenPhones.get(record.phone)}.`,
          });
        } else {
          seenPhones.set(record.phone, row);
        }
      }

      // ------------------------
      // Duplicate Farm Coordinate
      // ------------------------
      if (record.farmCoordinate) {
        if (seenCoordinates.has(record.farmCoordinate)) {
          warnings.push({
            row,
            field: "farmCoordinate",
            type: "DUPLICATE",
            message: `Duplicate farm coordinate. First found in row ${seenCoordinates.get(record.farmCoordinate)}.`,
          });
        } else {
          seenCoordinates.set(record.farmCoordinate, row);
        }
      }
    });

    return {
      errors,
      warnings,
    };
  }
}

export default new DuplicateService();