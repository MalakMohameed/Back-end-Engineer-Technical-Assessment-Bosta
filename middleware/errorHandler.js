const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.message}`);

  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      success: false,
      message: 'Duplicate entry error',
      details: err.errors.map(e => e.message)
    });
  }

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      details: err.errors.map(e => e.message)
    });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === 'production' ? null : err.stack 
  });
};

module.exports = errorHandler;
