import { FC } from 'react'
import Table from 'react-bootstrap/Table'
import { format } from 'date-fns'
import { formatTime } from 'utils'
import { ITimeSheetTableData } from 'types/interfaces'

interface ITimeSheetTableProps {
  headers?: Array<{ head: string }>
  tableData?: Array<ITimeSheetTableData>
  view?: string
}

const TimeSheetTable: FC<ITimeSheetTableProps> = ({ tableData, headers, view }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {(headers || []).map((el, index) => {
            return <th key={index}>{el.head}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {view !== 'view' ? (
          <>
            {(tableData || []).map((el, index) => {
              return (
                <tr key={index} className={`${el.status}-check`}>
                  <td># {index + 1}</td>
                  <td>{el.task_name || el.task_id}</td>
                  <td>{el.project_name || el.project_id}</td>
                  <td>{format(new Date(el.date), 'dd/MM/yyyy')}</td>
                  <td>{format(new Date(el.log_start_time), 'hh:mm:ss')}</td>
                  <td>{format(new Date(el.log_end_time), 'hh:mm:ss')}</td>
                  <td>{formatTime(Number(el.duration))}</td>
                  <td>{el.status}</td>
                  <td>
                    <i className='fa fa-pencil' onClick={el.onClick}></i>
                  </td>
                </tr>
              )
            })}
          </>
        ) : (
          <>
            {(tableData || []).map((el, index) => {
              return (
                <tr key={index} className={`${el.status}-check`}>
                  <td># {index + 1}</td>
                  <td>{el.date}</td>
                  <td>{formatTime(Number(el.duration))}</td>
                </tr>
              )
            })}
          </>
        )}
      </tbody>
    </Table>
  )
}

export default TimeSheetTable
