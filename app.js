require("dotenv").config();

const express = require("express");
const cors = require("cors");

// Import the product routes
const productRoutes = require("./routes/product.routes");

// Import the MongoDB connection
const connectDB = require("./database/connectDB");
// Import the logger middleware
const logger = require("./middlewares/logger");
// Import the global error handler
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors('*'));
// Use the logger middleware for every request
app.use(logger);

// Use the product routes
app.use("/api/products", productRoutes);

// Connect to MongoDB
connectDB();

app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});