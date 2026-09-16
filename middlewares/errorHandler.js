// Global error-handling middleware
const errorHandler = (err, req, res, next) => {
    // Log the error for debugging
    console.error(err.stack);

    // Send a standard error response
    res.status(500).json({
        message: "Internal server error"
    });
};

module.exports = errorHandler;