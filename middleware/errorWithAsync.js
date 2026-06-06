// Async wrapper to catch unhandled promise rejections in routes
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Standard Central Global Error Processing
const errorHandler = (err, req, res, next) => {
  // Check if res exists and has a status function before using it
  const statusCode =
    res && res.status
      ? res.statusCode && res.statusCode !== 200
        ? res.statusCode
        : 500
      : 500;

  if (res && typeof res.status === "function") {
    return res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
    });
  }

  // Terminal fallback log if Express lifecycle isn't completely initialized
  console.error("Global Error Caught:", err);
};

module.exports = {
  catchAsync,
  errorHandler,
};
