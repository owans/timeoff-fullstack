const express = require("express");
const RequestModel = require("../models/abscencemodel");
const AuthMiddleware = require("../middleware/auth");
const router = express.Router();

// Create a Leave Request
router.post("/abscence", async function(req, res) {
    try {
      const Request = await RequestModel.create({
      leaveType: req.body.leaveType,
      startdate: req.body.startdate,
      enddate: req.body.enddate,
      totaldays: req.body.totaldays,
      requestmessage: req.body.requestmessage,
      employee: req.body.employee
    });

      res.json({ status: "success", data:  Request});
    } catch (err) {
      res.status(500).json({
        status: "error",
        message: "🤦🏾 an error occurred while creating your requests"
      });
    }
  }
);

// Get all employee leaveRequests
router.get("/", AuthMiddleware, async function(req, res) {
  try {
    const Requests = await RequestModel.find({ employee: req.user });

    res.json({ status: "success", data: Requests });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", message: "Could not find requests!" });
  }
});

module.exports = router;