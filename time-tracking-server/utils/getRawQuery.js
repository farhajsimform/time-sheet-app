const getTimeRangeQuery = (startDate, endDate, user_id) => {
  const query = `select * from Logs inner join Tasks on Logs.task_id = Tasks.id inner join Projects on Logs.project_id = Projects.id inner join Users on Logs.user_id = Users.id where date between '${startDate}' AND '${endDate}' and user_id = ${user_id}`;
  return query;
};

module.exports = { getTimeRangeQuery };
