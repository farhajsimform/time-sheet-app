import { APIEndpoints, HttpStatusCode } from 'constant'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { GET, PATCH } from 'services/httpService'
import { notifyToast, validateEntryForm } from 'utils'
import useCreateTimeSheet from './useCreateTimeSheet'

const useHandleTimeSheet = ({
  setSelectedTaskForEdit = () => {
    return
  },
  setSelectedProjectForEdit = () => {
    return
  },
  fetchAllTaskForEdit = () => {
    return
  },
}: any) => {
  const {
    duration,
    setComment,
    setSelectedDate,
    setTimeDuration,
    selectedDate,
    timeDuration,
    comment,
    formErrors,
    setFormErrors,
  } = useCreateTimeSheet({});
  const [tableData, setTableData] = useState([])
  const [innerTableData, setInnerTableData] = useState([])
  const [startDate, setStartDate] = useState<any>(new Date())
  const [endDate, setEndDate] = useState<any>(new Date())
  const [view, setView] = useState<string>('month')
  const [index, setIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)
  const [logId, setLogId] = useState('')

  const getTimeSheet = async (type: string, id: string) => {
    try {
      const response = await GET({
        subUrl: APIEndpoints.task.getUsersTimeSheet,
        params: {
          type,
          id,
        },
      })

      if (response.status === HttpStatusCode.Ok) {
        const timeSheetResponse = (response?.data?.data || []).map((el: any) => {
          return {
            ...el,
            task_name: el?.Task?.task_name,
            project_name: el?.Project?.name,
            username: el?.User?.username,
          }
        })
        setTableData(timeSheetResponse)
      }
    } catch (error) {
      return error
    }
  }

  const getTimeSheetByView = async () => {
    try {
      const response = await GET({
        subUrl: APIEndpoints.task.getUsersTimesheetByView,
        params: {
          startDate: format(new Date(startDate), 'yyyy-MM-dd HH:mm:ss'),
          endDate: format(new Date(endDate), 'yyyy-MM-dd HH:mm:ss'),
          view,
        },
      })

      if (response.status === HttpStatusCode.Ok) {
        setTableData(response?.data?.data?.alldata || [])
        setInnerTableData(response?.data?.data?.rangedata || [])
      }
    } catch (error) {
      return error
    }
  }

  const allTableData = useMemo(() => {
    const allData = tableData.map((el: any, index) => {
      return {
        ...el,
        onClick: () => {
          handleOpenEditForm(index)
        },
      }
    })
    return allData
  }, [tableData])

  const handleOpenEditForm = (index: number) => {
    const {
      comment: commentdata,
      log_start_time,
      log_end_time,
      date,
      project_id,
      task_id,
      id,
    } = tableData[index] || ({} as any)
    setComment(commentdata)
    setTimeDuration({
      ...timeDuration,
      startTime: new Date(log_start_time),
      endTime: new Date(log_end_time),
    })
    setSelectedTaskForEdit(task_id)
    setSelectedProjectForEdit(project_id)
    fetchAllTaskForEdit(project_id)
    setSelectedDate(new Date(date))
    setLogId(id)
    setIndex(index)
    setVisible(true)
  }

  const clearEntry = () => {
    setComment('')
    setTimeDuration({
      ...timeDuration,
      startTime: new Date(),
      endTime: new Date(),
    })
    setSelectedTaskForEdit('')
    setSelectedProjectForEdit('')
    setSelectedDate(new Date())
    setLogId('')
    setIndex(0)
    setVisible(false)
  }

  const handleUpdateEditEntry = async (project_id: string, task_id: string) => {
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
      const { errors, isValid } = validateEntryForm(payload)
      if (!isValid) {
        setFormErrors(errors)
        return
      }
      const response = await PATCH({
        subUrl: `${APIEndpoints.task.updateTimeSheetLog}/${logId}`,
        data: payload,
      })
      if (response.status === HttpStatusCode.Ok) {
        notifyToast({
          message: 'Updated successfully',
          type: 'success',
        })
        clearEntry()
        setFormErrors({})
      }
    } catch (error: any) {
      notifyToast({
        message: error?.response?.message || 'Unknown error',
        type: 'error',
      })
    }
  }

  return {
    getTimeSheet,
    tableData: allTableData,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    view,
    setView,
    getTimeSheetByView,
    setTableData,
    setComment,
    setSelectedDate,
    setTimeDuration,
    selectedDate,
    timeDuration,
    visible,
    setVisible,
    duration,
    index,
    comment,
    handleUpdateEditEntry,
    innerTableData,
    formErrors,
  }
}

export default useHandleTimeSheet
