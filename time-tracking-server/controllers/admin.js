const LogsModel = require("../models/Logs");
const UserModel = require("../models/Users");
const ProjectsModel = require("../models/Projects");
const TaskModel = require("../models/Task");
const getTimeSheetByUser = async (req, res) => {
  try {
    const { type } = req.query;
    const allReport = await LogsModel.findAll({
      where: {
        status: type,
      },
      include: [
        { model: TaskModel },
        { model: UserModel, attributes: ["username", "id"] },
        { model: ProjectsModel, attributes: ["name", "id", "description"] },
      ],
    });
    res.status(200).json({
      data: allReport,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveOrRejectTimeEntry = async (req, res) => {
  try {
    const { log_id, approval_type } = req.body;
    const logById = await LogsModel.findOne({
      where: {
        id: Number(log_id),
      },
    });
    if (logById) {
      await logById.update({ status: approval_type, updatedAt: new Date() });
    }
    res.status(200).json({
      message: "success",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTimeSheetByUser,
  approveOrRejectTimeEntry,
};
