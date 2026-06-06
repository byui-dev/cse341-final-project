// Async wrapper to catch unhandled promise rejections in routes
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Central Global Error Processing (With automatic parameter correction fallback)
const errorHandler = (err, req, res, next) => {
  // Safe Fallback: If parameters are shifted by Express, locate the genuine response object
  let realRes = res;
  if (req && typeof req.status === "function") realRes = req;
  if (err && typeof err.status === "function") realRes = err;

  // Determine the correct status code safely
  const statusCode =
    realRes.statusCode && realRes.statusCode !== 200 ? realRes.statusCode : 500;

  return realRes.status(statusCode).json({
    message: err.message || "An internal server error occurred",
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = {
  catchAsync,
  errorHandler,
};
