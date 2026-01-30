const express = require("express");
const router = express.Router();
const { loginStaff, getPendingApplications, approveApplication, rejectApplication, registrationStaff } = require("../controller/staffController.js");

// staff login
router.post("/login", loginStaff);
router.post("/register",registrationStaff);

// teacher / dean fetch pending applications
router.get("/:staffId/pending", getPendingApplications);

// approve / reject
router.post("/application/:applicationId/approve", approveApplication);
router.post("/application/:applicationId/reject", rejectApplication);

module.exports = router;
