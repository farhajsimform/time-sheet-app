/* eslint-disable quotes */
export const APIEndpoints = {
  authentication: {
    login: '/auth/login',
  },
  task: {
    getProjects: '/task/projects',
    getTaskById: (id: string) => {
      return `/task/projects/${id}/task`
    },
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
