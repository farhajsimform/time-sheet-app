const LogsModel = require("../models/Logs");
const sequelize = require("../database/connection");
const getTimeSheetByUser = async (_, res) => {
  try {
    // const [results, _] = await sequelize.query(
    //   `SELECT * from Logs INNER JOIN Users ON Logs.user_id = Users.id`
    // );
    // console.log("results", results);
    //
    const allReport = await LogsModel.findAll({
      where: {
        status: "pending",
      },
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
    console.log(logById)
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
