import { APIEndpoints, HttpStatusCode } from 'constant'
import { useMemo, useState } from 'react'
import { GET, PATCH } from 'services/httpService'
import { ITimeSheetTableData } from 'types/interfaces'
import { notifyToast } from 'utils'

const useHandleAdminAction = () => {
  const [tableData, setTableData] = useState<Array<ITimeSheetTableData>>([])
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState<number>(0)
  const [selectedReportType, setSelectedReportType] = useState('pending')

  const getTimeSheet = async (type: string) => {
    try {
      const response = await GET({
        subUrl: APIEndpoints.admin.getAllTaskLogs,
        params: {
          type,
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

  const allTableData = useMemo(() => {
    const allData = tableData.map((el, index) => {
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

  const handleApproveOrReject = async (approval_type: string) => {
    try {
      const { id: log_id } = tableData[index]
      const response = await PATCH({
        subUrl: APIEndpoints.admin.approveOrRejectRequest,
        data: {
          log_id,
          approval_type,
        },
      })

      if (response.status === HttpStatusCode.Ok) {
        notifyToast({
          message: 'Success',
          type: 'success',
        })
        const oldState = [...tableData]
        oldState.splice(index, 1)
        setTableData(oldState)
        setIndex(0)
        setVisible(false)
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
    visible,
    setVisible,
    index,
    handleApproveOrReject,
    selectedReportType,
    setSelectedReportType,
  }
}

export default useHandleAdminAction
