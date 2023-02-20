const ProjectsModel = require("../models/Projects");
const TaskModel = require("../models/Task");
const LogsModel = require("../models/Logs");
const FilterObjects = require("../utils/filterObject");
const UserModels = require("../models/Users");
const sequelize = require("../database/connection");
const { dateRange, weekRange } = require("../utils/commonFunction");
const { format } = require("date-fns");
const { getTimeRangeQuery } = require("../utils/getRawQuery");

LogsModel.belongsTo(TaskModel, { foreignKey: "task_id", targetKey: "id" });
LogsModel.belongsTo(UserModels, { foreignKey: "user_id", targetKey: "id" });
LogsModel.belongsTo(ProjectsModel, {
  foreignKey: "project_id",
  targetKey: "id",
});

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

    let dateRangeArray =
      view === "month"
        ? dateRange(new Date(startDate), new Date(endDate))
        : weekRange(new Date(startDate), new Date(endDate));

    let rangeArray = [];
    let allData = [];
    console.log("dateRangeArray", dateRangeArray);

    for (const iterator of dateRangeArray) {
      const query = getTimeRangeQuery(
        format(new Date(iterator.firstDay), "yyyy-MM-dd HH:mm:ss"),
        format(new Date(iterator.lastDay), "yyyy-MM-dd HH:mm:ss"),
        user_id
      );
      const [results, _] = await sequelize.query(query);

      const totalDuration = results
        .map((el) => {
          return el.duration;
        })
        .reduce((acc, val) => {
          return acc + val;
        }, 0);

      totalDuration > 0 &&
        rangeArray.push({
          duration: totalDuration,
          date: `${format(
            new Date(iterator.firstDay),
            "yyyy-MM-dd"
          )} - ${format(new Date(iterator.lastDay), "yyyy-MM-dd")}`,
        });
      const rangeData = results.map((el) => {
        return {
          id: el.id,
          log_start_time: el.log_start_time,
          log_end_time: el.log_end_time,
          duration: el.duration,
          project_id: el.project_id,
          task_id: el.task_id,
          user_id: el.user_id,
          status: el.status,
          task_name: el.task_name,
          project_name: el.name,
          username: el.username,
          date: el.date,
        };
      });
      allData = [...allData, ...rangeData];
    }

    res.status(200).json({
      data: {
        rangedata: rangeArray,
        alldata: allData,
      },
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
