const User = require("../models/UsersModel.js");
const Application = require("../models/ApplicationModel.js");
const bcrypt = require("bcryptjs");

// register student
exports.registerStudent = async (req, res) => {
    try {
        const {
            username,
            prn,
            mobile,
            branch,
            gender,
            session,
            password,
        } = req.body;

        const existingStudent = await User.findOne({ prn });
        if (existingStudent) {
            return res.status(400).json({ message: "Student already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const student = await User.create({
            username,
            prn,
            mobile,
            branch,
            gender,
            session,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "Registration successful",
            student,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// login student
exports.loginStudent = async (req, res) => {
    const { prn, password } = req.body;
    try {
        const student = await User.findOne({ prn });
        if (!student) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({
            message: "Login successful",
            student:{
                studentId:student._id,
                name:student.username,
                prn:student.prn,
                mobile:student.mobile,
                branch:student.branch,
                gender:student.gender,
                session:student.session,
                role:student.role
            }
        });
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
