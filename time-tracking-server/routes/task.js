const express = require("express");
const router = express.Router();
const TaskController = require("../controllers/task");
const UserAuthCheck = require("../middlewares/middleware");

router.get("/projects", UserAuthCheck, TaskController.getAllProjects);
router.get(
  "/projects/:project_id/task",
  UserAuthCheck,
  TaskController.getTaskByProejctId
);

router.post(
  "/create-log-request",
  UserAuthCheck,
  TaskController.createTimeSheetEntry
);

router.get(
  "/get-users-timesheet",
  UserAuthCheck,
  TaskController.getTimeSheetByUserId
);

router.get(
  "/get-users-timesheet-by-view",
  UserAuthCheck,
  TaskController.timeSheetByTimeView
);

router.patch(
  "/update-time-sheet/:log_id",
  UserAuthCheck,
  TaskController.updateTimeSheetEntry
);
module.exports = router;
