const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
    {
        staffName: {
            type: String,
            required: true,
            trim: true,
        },

        staffId: {
            type: String,
            required: true,
            unique: true,
        },

        mobile: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["teacher", "dean"],
            required: true,
        },

        classTeacherOf: {
            classDepartment: {
                type: String,
            },
        },

        department: {
            type: String,
            required: true
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
