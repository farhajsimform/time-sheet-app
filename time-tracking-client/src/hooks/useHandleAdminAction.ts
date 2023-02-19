import { APIEndpoints, HttpStatusCode } from 'constant'
import { useMemo, useState } from 'react'
import { GET, PATCH } from 'services/httpService'
import { notifyToast } from 'utils'

const useHandleAdminAction = () => {
  const [tableData, setTableData] = useState([])
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState<number>(0)

  const getTimeSheet = async () => {
    try {
      const response = await GET({
        subUrl: APIEndpoints.admin.getAllTaskLogs,
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
  }, [tableData]);

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
  }
}

export default useHandleAdminAction
