// Logger middleware
// This shows the HTTP method and URL for every request

const logger = (req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);

    // Move to the next middleware or route
    next();
};

module.exports = logger;