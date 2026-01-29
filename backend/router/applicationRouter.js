const express = require("express");
const router = express.Router();
const {
    submitApplication,
    getStudentApplications
} = require("../controller/applicationController.js");

// student submits new leave application
router.post("/submit", submitApplication);

// get all applications of a student
router.get("/:studentId", getStudentApplications);

module.exports = router;
