const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    reason: {
      type: String,
      required: true,
    },

    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },
    teacherstatus: {
      type: String,
      enum: [
        'pending_teacher',
        'rejected_by_teacher',
        'approved'
      ],
      default: 'pending_teacher',
    },
    deanstatus: {
      type:String,
      enum:[
        'pending_dean',
        'rejected_by_dean',
        'approved'
      ],
      default:'pending_dean'
    },

    teacherRemark: {
      type: String,
      default: '',
    },

    deanRemark: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Application', applicationSchema);
