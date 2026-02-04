const Application = require('../models/ApplicationModel.js');

// Submit new application
const mongoose = require('mongoose');

exports.submitApplication = async (req, res) => {
    try {
        const { studentId, subject, reason, fromDate, toDate } = req.body;

        if (!mongoose.Types.ObjectId.isValid(studentId)) {
            return res.status(400).json({ message: 'Invalid studentId' });
        }

        const newApp = new Application({
            studentId,
            subject,
            reason,
            fromDate,
            toDate,
        });

        await newApp.save();
        res.status(201).json({ message: 'Application submitted successfully', application: newApp });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Get all applications of a student
exports.getStudentApplications = async (req, res) => {
    try {
        const applications = await Application.find({ studentId: req.params.studentId });
        res.status(200).json(applications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
