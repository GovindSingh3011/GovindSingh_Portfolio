const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { protect, adminOnly } = require("../middleware/auth.middleware");
const fs = require("fs");
const Resume = require("../models/resume.model");
const Certificate = require("../models/certificate.model");

const router = express.Router();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer filter for PDF only
const pdfFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed!"), false);
    }
};
const uploadPdf = multer({ dest: "/tmp", fileFilter: pdfFilter });

// POST /api/pdf/resume
router.post(
    "/resume",
    protect,
    adminOnly,
    uploadPdf.single("file"),
    async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded or invalid file type" });
            }

            // Prepare Cloudinary upload
            const originalName = req.file.originalname
                ? req.file.originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_")
                : "resume";

            // Upload new PDF to Cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "resume",
                resource_type: "auto",
                type: "upload",
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                public_id: originalName,
                access_mode: "public",
            });

            fs.unlinkSync(req.file.path);

            // Remove version from the returned URL
            let fileUrl = result.secure_url;
            fileUrl = fileUrl.replace(/\/v\d+\//, "/");

            // Find existing resume record
            let resume = await Resume.findOne();

            // update or create resume record
            if (resume) {
                resume.url = fileUrl;
                await resume.save();
            } else {
                resume = await Resume.create({ url: fileUrl });
            }

            res.json({ success: true, url: resume.url });
        } catch (err) {
            console.error("Resume PDF upload error:", err);
            res.status(500).json({ success: false, message: "Resume upload error: " + err.message, error: err });
        }
    }
);

// GET /api/pdf/resume
router.get(
    "/resume",
    async (req, res) => {
        try {
            const resumes = await Resume.find();
            res.json({ success: true, data: resumes });
        } catch (err) {
            console.error("Error fetching resumes:", err);
            res.status(500).json({ success: false, message: "Error fetching resumes", error: err });
        }
    }
);

// POST /api/pdf/certificate
router.post(
    "/certificate",
    protect,
    adminOnly,
    uploadPdf.single("file"),
    async (req, res) => {
        try {
            const { name, organization, dateCompleted } = req.body;
            if (!req.file) {
                return res.status(400).json({ success: false, message: "No file uploaded or invalid file type" });
            }
            if (!name || !organization || !dateCompleted) {
                return res.status(400).json({ success: false, message: "Missing required fields" });
            }

            const originalName = req.file.originalname
                ? req.file.originalname.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9-_]/g, "_")
                : "certificate";

            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "certificates",
                resource_type: "auto",
                type: "upload",
                use_filename: true,
                unique_filename: false,
                overwrite: false,
                public_id: originalName + "_" + Date.now(),
                access_mode: "public",
            });

            fs.unlinkSync(req.file.path);

            let fileUrl = result.secure_url;
            fileUrl = fileUrl.replace(/\/v\d+\//, "/");

            const certificate = await Certificate.create({
                name,
                organization,
                dateCompleted,
                url: fileUrl,
            });

            res.json({ success: true, data: certificate });
        } catch (err) {
            console.error("Certificate PDF upload error:", err);
            res.status(500).json({ success: false, message: "Certificate upload error: " + err.message, error: err });
        }
    }
);

// GET /api/pdf/certificate
router.get(
    "/certificate",
    async (req, res) => {
        try {
            const certificates = await Certificate.find();
            res.json({ success: true, data: certificates });
        } catch (err) {
            console.error("Error fetching certificates:", err);
            res.status(500).json({ success: false, message: "Error fetching certificates", error: err });
        }
    }
);

module.exports = router;