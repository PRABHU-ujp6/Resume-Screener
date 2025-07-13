const express = require('express')
const multer = require('multer')

const ResumeController = require('../controllers/resumeController');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage });

router.get("/upload", ResumeController.showUploadForm);
router.post('/upload', upload.single("resume"), ResumeController.handleUpload);
router.get("/results", ResumeController.showResults);
router.get("/shortlist", ResumeController.shortlistAndNotify)

module.exports = router;
