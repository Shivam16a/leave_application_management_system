const Staff = require('../models/StaffModel.js');
const Application = require('../models/ApplicationModel.js');
const bcrypt = require('bcryptjs');

//registration staff
exports.registrationStaff = async (req, res) => {
    try {
        const {
            staffName,
            staffId,
            mobile,
            role,
            classTeacherOf,
            department,
            password,
        } = req.body;

        // check if staff already exists
        const existingStaff = await Staff.findOne({ staffId });
        if (existingStaff) {
            return res.status(400).json({ message: 'Staff already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const staff = await Staff.create({
            staffName,
            staffId,
            mobile,
            role,
            classTeacherOf,
            department,
            password: hashedPassword,
        });

        res.status(201).json({
            message: 'Staff registered successfully',
            staff,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// login staff
exports.loginStaff = async (req, res) => {
    const { staffId, password } = req.body;
    try {
        const staff = await Staff.findOne({ staffId });
        if (!staff) return res.status(400).json({ message: 'Invalid credentials' });
        const isMatch = await bcrypt.compare(password, staff.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({
            message: 'Login successful',
            staff: {
                staffmongoId:staff._id,
                staffName: staff.staffName,
                staffId: staff.staffId,
                mobile: staff.mobile,
                role: staff.role,
                department: staff.department
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// get pending applications for teacher/dean
exports.getPendingApplications = async (req, res) => {
    try {
        const staff = await Staff.findOne({ staffId: req.params.staffId });
        if (!staff) return res.status(404).json({ message: 'Staff not found' });

        let applications = [];

        if (staff.role === 'teacherapplicationchecker') {
            applications = await Application.find({
                teacherstatus: 'pending_teacher',
            }).populate('studentId');
        }

        if (staff.role === 'dean') {
            applications = await Application.find({
                teacherstatus: 'approved',
                deanstatus: 'pending_dean',
            }).populate('studentId');
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
        if (!app) return res.status(404).json({ message: 'Application not found' });

        const staff = await Staff.findById(req.body.staffId);

        if (staff.role === 'teacherapplicationchecker') {
            app.teacherstatus = 'approved';
            app.teacherRemark = req.body.remark || '';
        }

        if (staff.role === 'dean') {
            app.deanstatus = 'approved';
            app.deanRemark = req.body.remark || '';
        }

        await app.save();
        res.status(200).json({ message: 'Application approved', app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// reject application
exports.rejectApplication = async (req, res) => {
    try {
        const app = await Application.findById(req.params.applicationId);
        if (!app) return res.status(404).json({ message: 'Application not found' });

        const staff = await Staff.findById(req.body.staffId);

        if (staff.role === 'teacherapplicationchecker') {
            app.teacherstatus = 'rejected_by_teacher';
            app.teacherRemark = req.body.remark || '';
        }

        if (staff.role === 'dean') {
            app.deanstatus = 'rejected_by_dean';
            app.deanRemark = req.body.remark || '';
        }

        await app.save();
        res.status(200).json({ message: 'Application rejected', app });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
