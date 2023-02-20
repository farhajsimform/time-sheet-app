const UserModel = require("../models/Users");
const ProjectsModel = require("../models/Projects");
const TaskModel = require("../models/Task");
const getFilterObjectForTimeSheet = (type, id, userid) => {
  userid = Number(userid);
  id = Number(id);
  let multiDataObject = [
    { model: TaskModel },
    { model: UserModel, attributes: ["username", "id"] },
    { model: ProjectsModel, attributes: ["name", "id", "description"] },
  ];
  let object = {
    where: {
      user_id: userid,
    },
    include: multiDataObject,
  };
  if (type === "task") {
    object = {
      where: {
        user_id: userid,
        task_id: id,
      },
      include: multiDataObject,
    };
  }
  if (type === "project") {
    object = {
      where: {
        user_id: userid,
        project_id: id,
      },
      include: multiDataObject,
    };
  }
  return object;
};

module.exports = {
  getFilterObjectForTimeSheet,
};
