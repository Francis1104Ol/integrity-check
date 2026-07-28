class ApiResponse {
  constructor(success, message, data = null, meta = null) {
    this.success = success;
    this.message = message;

    if (data !== null) {
      this.data = data;
    }

    if (meta) {
      this.meta = meta;
    }
  }

  static success(message, data = null, meta = null) {
    return new ApiResponse(true, message, data, meta);
  }

  static error(message, errors = []) {
    return {
      success: false,
      message,
      errors,
    };
  }
}

export default ApiResponse;