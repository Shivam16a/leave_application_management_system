const Staff = require("../models/StaffModel.js");
const Application = require("../models/ApplicationModel.js");

// login staff
exports.loginStaff = async (req, res) => {
    const { staffId, password } = req.body;
    try {
        const staff = await Staff.findOne({ staffId, password });
        if (!staff) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", staff });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get pending applications for teacher/dean
exports.getPendingApplications = async (req, res) => {
    try {
        const staff = await Staff.findById(req.params.staffId);
        if (!staff) return res.status(404).json({ message: "Staff not found" });

        let applications;
        if (staff.role === "teacher") {
            applications = await Application.find({
                status: "pending_teacher"
            }).populate("studentId");
        } else if (staff.role === "dean") {
            applications = await Application.find({
                status: "pending_dean"
            }).populate("studentId");
        }

        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// approve application
exports.approveApplication = async (req, res) => {
    try {
        const app = await Application.findById(req.params.applicationId);
        if (!app) return res.status(404).json({ message: "Application not found" });

        const staff = await Staff.findById(req.body.staffId);

        if (staff.role === "teacher") {
            app.status = "pending_dean";
            app.teacherRemark = req.body.remark || "";
        } else if (staff.role === "dean") {
            app.status = "approved";
            app.deanRemark = req.body.remark || "";
        }

        await app.save();
        res.status(200).json({ message: "Application approved", app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// reject application
exports.rejectApplication = async (req, res) => {
    try {
        const app = await Application.findById(req.params.applicationId);
        if (!app) return res.status(404).json({ message: "Application not found" });

        const staff = await Staff.findById(req.body.staffId);

        if (staff.role === "teacher") {
            app.status = "rejected_by_teacher";
            app.teacherRemark = req.body.remark || "";
        } else if (staff.role === "dean") {
            app.status = "rejected_by_dean";
            app.deanRemark = req.body.remark || "";
        }

        await app.save();
        res.status(200).json({ message: "Application rejected", app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
