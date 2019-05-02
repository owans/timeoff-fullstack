const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
  leaveType: {
    type: String,
    required: true
  },
  startdate: {
    type: Date,
    required: true
  },
  enddate: {
    type: Date,
    required: true
  },
  totaldays: {
    type: Number,
    required: true
  },
  requestmessage: {
    type: String,
    required: true
  },
  employee: {
    // The leave request employee's ID
    type: String,
    required: true
  }
});

const RequestModel = mongoose.model("Request", RequestSchema);

module.exports = RequestModel;