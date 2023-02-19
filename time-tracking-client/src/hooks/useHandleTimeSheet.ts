import { APIEndpoints, HttpStatusCode } from 'constant'
import { format } from 'date-fns'
import { useMemo, useState } from 'react'
import { GET } from 'services/httpService'
import useCreateTimeSheet from './useCreateTimeSheet'

const useHandleTimeSheet = () => {
  const { duration, setComment, setSelectedDate, setTimeDuration, selectedDate, timeDuration } =
    useCreateTimeSheet()
  const [tableData, setTableData] = useState([])
  const [startDate, setStartDate] = useState<any>(new Date())
  const [endDate, setEndDate] = useState<any>(new Date())
  const [view, setView] = useState<string>('month')
  const [index, setIndex] = useState<number>(0)
  const [visible, setVisible] = useState<boolean>(false)

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
        setTableData(response?.data?.data || [])
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
        setTableData(response?.data?.data || [])
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
          setIndex(index)
          setVisible(true)
        },
      }
    })
    return allData
  }, [tableData])

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
  }
}

export default useHandleTimeSheet
