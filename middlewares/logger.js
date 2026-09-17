// Logger middleware
// This shows the HTTP method and URL for every request

const logger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`${timestamp} - ${req.method} ${req.originalUrl} from ${req.ip}`);
    // Move to the next middleware or route
    next();
};

module.exports = logger;