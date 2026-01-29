const express = require("express");
const router = express.Router();
const { loginStudent, getStudentApplications } = require("../controller/userController.js");

// student login
router.post("/login", loginStudent);

// get all applications of student
router.get("/:studentId/applications", getStudentApplications);

module.exports = router;
