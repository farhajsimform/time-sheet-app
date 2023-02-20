export interface IEntryFormData {
  log_start_time: string
  log_end_time: string
  date: string
  comment: string
  duration: number
  project_id: string
  task_id: string
}

export interface IFormErrors {
  project: string
  task: string
  duration: string
}

export interface ITimeSheetTableData extends IEntryFormData {
  project_name: string
  task_name: string
  username: string
  id: number | string
  status: string
  user_id: string
  onClick: any
}

export interface IReportTypes {
  key: string
  value: string
}

export interface ILoginForm {
    username: string
    password: string
}