const notFoundMiddleware = (req, res) => {
  return res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
};

export default notFoundMiddleware;