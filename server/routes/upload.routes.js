const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { protect, adminOnly } = require("../middleware/auth.middleware");
const fs = require("fs");

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer config for local file storage (in memory)
const upload = multer({ dest: "/tmp" });

// POST /api/uploads/projects
router.post(
  "/projects",
  protect,
  adminOnly,
  upload.single("file"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
      // Upload file to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "projects",
        resource_type: "auto",
      });
      // Remove temp file
      fs.unlinkSync(req.file.path);

      res.json({ success: true, fileUrl: result.secure_url });
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      res.status(500).json({ success: false, message: "File upload failed", error: err.message });
    }
  }
);

module.exports = router;
