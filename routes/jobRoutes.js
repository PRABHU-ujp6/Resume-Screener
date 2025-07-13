const express = require('express');

const JobDescController = require('../controllers/jobController')

const router = express.Router();

router.get("/jobdescription", JobDescController.showJobDescriptionForm);
router.post('/jobdescription', JobDescController.submitJobDescription)

module.exports = router;