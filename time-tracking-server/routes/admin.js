const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.get("/all-timesheet", adminController.getTimeSheetByUser);
router.patch(
  "/approve-or-reject-request",
  adminController.approveOrRejectTimeEntry
);

module.exports = router;
