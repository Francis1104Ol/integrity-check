// const errorMiddleware = (err, req, res, next) => {
//   const statusCode = err.statusCode || 500;

//   return res.status(statusCode).json({
//     success: false,
//     message:
//       statusCode === 500
//         ? "Internal Server Error"
//         : err.message,
//     errors: err.errors || [],
//     timestamp: new Date().toISOString(),
//     path: req.originalUrl,
//   });
// };

// export default errorMiddleware;
const errorMiddleware = (err, req, res, next) => {
  console.error("\n========== ERROR ==========");
  console.error("Message:", err.message);
  console.error("Name:", err.name);
  console.error("Status:", err.statusCode);
  console.error("Stack:");
  console.error(err.stack);
  console.error("===========================\n");

  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};

export default errorMiddleware;