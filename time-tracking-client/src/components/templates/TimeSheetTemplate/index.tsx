import Layout from 'components/molecules/Layout'
import TimeSheetOrgnism from 'components/organisms/TimeSheetOrgnism'
import { FC } from 'react'

const TimeSheetTableTemplate: FC = () => {
  return (
    <Layout title='Timesheet Table'>
      <TimeSheetOrgnism />
    </Layout>
  )
}
export default TimeSheetTableTemplate
