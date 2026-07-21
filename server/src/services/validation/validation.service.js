class ValidationService {
  validate(records) {
    return {
      totalRecords: records.length,
      errors: [],
      warnings: [],
    };
  }
}

export default new ValidationService();