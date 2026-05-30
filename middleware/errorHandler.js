const errorHandler = (err, req, res, next) => {
    console.error('ERROR:', err.message);

    const statusCode = err.status || 500;

    // Handle invalid MongoDB ObjectId
    if (err.name === 'CastError') {
        return res.status(400).json({ message: 'Invalid ObjectId format' });
    }

    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
};

module.exports = errorHandler;
