/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react'
import { differenceInMinutes } from 'date-fns'
import { notifyToast, validateEntryForm } from 'utils'
import { POST } from 'services/httpService'
import { APIEndpoints, HttpStatusCode } from 'constant'

const useCreateTimeSheet = ({
  setSelectedTask = () => {
    return
  },
  setSelectedProject = () => {
    return
  },
}: any) => {
  const initialTimeState = {
    startTime: new Date(),
    endTime: new Date(),
    total: '',
  }
  const [selectedDate, setSelectedDate] = useState<any>(new Date())
  const [timeDuration, setTimeDuration] = useState<any>(initialTimeState)
  const [comment, setComment] = useState('')
  const [formErrors, setFormErrors] = useState<any>({})

  const duration = useMemo(() => {
    const diff = differenceInMinutes(
      new Date(timeDuration.endTime),
      new Date(timeDuration.startTime),
    )
    return diff
  }, [timeDuration])

  const clearFormValues = () => {
    setTimeDuration(initialTimeState)
    setSelectedDate(new Date())
    setComment('')
    setSelectedTask('')
    setSelectedProject('')
  }

  const createTimeLogRequest = async (project_id: string, task_id: string) => {
    try {
      const payload = {
        log_start_time: timeDuration.startTime,
        log_end_time: timeDuration.endTime,
        date: selectedDate,
        comment,
        duration,
        project_id,
        task_id,
      }
      const { isValid, errors } = validateEntryForm(payload)
      if (!isValid) {
        setFormErrors(errors)
        return
      }
      const response = await POST({ subUrl: APIEndpoints.task.createLogRequest, data: payload })
      if (response.status === HttpStatusCode.Ok) {
        notifyToast({
          message: 'Created successfully',
          type: 'success',
        })
        setFormErrors({})
        clearFormValues()
      }
    } catch (error: any) {
      notifyToast({
        message: error?.response?.message || 'Unknown error',
        type: 'error',
      })
    }
  }

  return {
    setSelectedDate,
    selectedDate,
    setTimeDuration,
    timeDuration,
    setComment,
    createTimeLogRequest,
    duration,
    comment,
    formErrors,
    setFormErrors,
  }
}

export default useCreateTimeSheet
