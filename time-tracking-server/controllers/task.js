const ProjectsModel = require("../models/Projects");
const TaskModel = require("../models/Task");
const LogsModel = require("../models/Logs");
const FilterObjects = require("../utils/filterObject");
const sequelize = require("../database/connection");

const getAllProjects = async (_, res) => {
  try {
    const allProjects = await ProjectsModel.findAll({});
    res.status(200).json({
      data: allProjects,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTaskByProejctId = async (req, res) => {
  try {
    const { project_id } = req.params;
    const filterObject =
      project_id === "all"
        ? {}
        : {
            where: {
              project_id: Number(project_id),
            },
          };
    const allTasks = await TaskModel.findAll(filterObject);
    res.status(200).json({
      data: allTasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createTimeSheetEntry = async (req, res) => {
  try {
    await LogsModel.create({
      ...req.body,
      user_id: req?.tokenData?.id,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "pending",
    });
    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTimeSheetByUserId = async (req, res) => {
  try {
    const { id: user_id } = req.tokenData;
    const { type, id } = req.query;
    const filterObject = FilterObjects.getFilterObjectForTimeSheet(
      type,
      id,
      user_id
    );
    const allReportByUserId = await LogsModel.findAll(filterObject);
    res.status(200).json({
      data: allReportByUserId,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const timeSheetByTimeView = async (req, res) => {
  try {
    const { id: user_id } = req.tokenData;
    const { view, startDate, endDate } = req.query;

    const query =
      view === "month"
        ? `select id, SUM(duration) as duration, CONCAT(YEAR(date), '-', MONTH(date),'-', WEEK(date)) as date  from Logs 
    where date between '${startDate}' AND '${endDate}' and user_id = ${user_id} group by MONTH(date)`
        : `select id, SUM(duration) as duration, CONCAT(YEAR(date), '-', MONTH(date),'-', WEEK(date)) as date  from Logs 
    where date between '${startDate}' AND '${endDate}' and user_id = ${user_id} group by WEEK(date)`;

    const [results, _] = await sequelize.query(query);

    res.status(200).json({
      data: results,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateTimeSheetEntry = async (req, res) => {
  try {
    const { log_id } = req.params;
    const logById = await LogsModel.findOne({
      where: {
        id: Number(log_id),
      },
    });
    if (logById) {
      await logById.update({
        ...req.body,
        updatedAt: new Date(),
        status: "pending",
      });
    }
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProjects,
  getTaskByProejctId,
  createTimeSheetEntry,
  getTimeSheetByUserId,
  timeSheetByTimeView,
  updateTimeSheetEntry,
};
