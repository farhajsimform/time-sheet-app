const getFilterObjectForTimeSheet = (type, id, userid) => {
  userid = Number(userid);
  id = Number(id);
  let object = {
    where: {
      user_id: userid,
    },
  };
  if (type === "task") {
    object = {
      where: {
        user_id: userid,
        task_id: id,
      },
    };
  }
  if (type === "project") {
    object = {
      where: {
        user_id: userid,
        project_id: id,
      },
    };
  }
  return object;
};

module.exports = {
  getFilterObjectForTimeSheet,
};
