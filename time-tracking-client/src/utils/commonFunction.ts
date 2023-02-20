import { IEntryFormData, IFormErrors, ILoginForm } from 'types/interfaces'

export const formatTime = (time: number) => {
  const seconds = time % 60
  const minutes = Math.floor(time / 60)
  return ('' + minutes).padStart(2, '0') + ':' + ('' + seconds).padStart(2, '0')
}

export const validateEntryForm = (values: IEntryFormData) => {
  const { duration, project_id, task_id } = values
  const errors = {} as IFormErrors
  let isValid = true

  if (duration <= 0) {
    isValid = false
    errors.duration = 'End time should be greater than start time.'
  }
  if (!project_id) {
    isValid = false
    errors.project = 'Please select a project!'
  }

  if (!task_id) {
    isValid = false
    errors.task = 'Please select a project!'
  }
  return {
    errors,
    isValid,
  }
}

export const validateLoginForm = (values: ILoginForm) => {
  const { username, password } = values
  const errors = {} as ILoginForm
  let isValid = true

  if (!username.trim()) {
    isValid = false
    errors.username = 'Please enter the username!'
  }

  if (!password.trim()) {
    isValid = false
    errors.password = 'Please enter the password!'
  }
  return {
    errors,
    isValid,
  }
}
