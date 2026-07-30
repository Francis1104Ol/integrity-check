const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  // Don't spam the console during tests.
  // In development, only log unexpected server errors.
  if (
    process.env.NODE_ENV !== "test" &&
    statusCode >= 500
  ) {
    console.error("\n========== ERROR ==========");
    console.error("Message:", err.message);
    console.error("Name:", err.name);
    console.error("Status:", statusCode);
    console.error(err.stack);
    console.error("===========================\n");
  }

  return res.status(statusCode).json({
    success: false,
    message:
      statusCode === 500
        ? "Internal Server Error"
        : err.message,
    errors: err.errors || [],
  });
};

export default errorMiddleware;