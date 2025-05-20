const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth.routes");
const projectRoutes = require("./routes/project.routes");
const uploadRoutes = require("./routes/upload.routes");
const pdfRoutes = require("./routes/pdf.routes");
const { verifyAdminExists } = require("./config/admin.setup");

// Initialize express app
const app = express();

// Apply middleware
app.use(helmet({ crossOriginResourcePolicy: false, crossOriginEmbedderPolicy: false })); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev")); // Logging

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX ? parseInt(process.env.RATE_LIMIT_MAX) : 1000, // Increase limit for dev
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    // Ensure admin user exists
    verifyAdminExists();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// Set up routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/pdf", pdfRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Project Management API" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred",
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
