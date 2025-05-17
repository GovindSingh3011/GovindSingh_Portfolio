const express = require("express");
const multer = require("multer");
const cors = require('cors');
const { protect, adminOnly } = require('../middleware/auth.middleware');

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/projects');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post("/uploads/projects",protect,adminOnly, upload.single('image'), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.end();
});

// Enable CORS for static files
router.use('/uploads/projects', cors(), express.static('uploads/projects'));

// Storage for resume (PDF) uploads
const resumeStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/resumes'); // Store PDFs in uploads/resumes
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Save with original name
  }
});

// Only accept PDF files
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

const uploadResume = multer({ storage: resumeStorage, fileFilter: pdfFilter });

// Ensure resumes directory exists
const fs = require('fs');
const resumesDir = './uploads/resumes';
if (!fs.existsSync(resumesDir)) {
  fs.mkdirSync(resumesDir, { recursive: true });
}

// POST /api/uploads/resumes (protected, admin only)
router.post(
  "/uploads/resumes",
  protect,
  adminOnly,
  (req, res, next) => {
    uploadResume.single('resume')(req, res, function (err) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded" });
      }
      res.end();
    });
  }
);

// Serve resumes statically with CORS
router.use('/uploads/resumes', cors(), express.static('uploads/resumes'));

module.exports = router;
