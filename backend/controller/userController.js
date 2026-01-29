const User = require("../models/UsersModel.js");
const Application = require("../models/ApplicationModel.js");

// login student
exports.loginStudent = async (req, res) => {
    const { prn, password } = req.body;
    try {
        const student = await User.findOne({ prn, password });
        if (!student) return res.status(400).json({ message: "Invalid credentials" });

        res.status(200).json({ message: "Login successful", student });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get student applications
exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ studentId: req.params.studentId });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
