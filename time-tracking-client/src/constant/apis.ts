export const APIEndpoints = {
  authentication: {
    login: '/auth/login',
  },
  task: {
    getProjects: '/task/get-all-projects',
    getTaskById: '/task/get-task-by-project-id',
    createLogRequest: '/task/create-log-request',
    getUsersTimeSheet: '/task/get-users-timesheet',
    getUsersTimesheetByView: '/task/get-users-timesheet-by-view',
    updateTimeSheetLog: '/task//update-time-sheet',
  },
  admin: {
    getAllTaskLogs: '/admin/all-timesheet',
    approveOrRejectRequest: '/admin/approve-or-reject-request',
  },
}
