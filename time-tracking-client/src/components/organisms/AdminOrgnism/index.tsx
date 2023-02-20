import TimeSheetTable from 'components/molecules/TimeSheetTable'
import { headers, reportTypes } from 'constant'
import useHandleAdminAction from 'hooks/useHandleAdminAction'
import { FC, useEffect } from 'react'
import { Button, Container, Row, Form, Col } from 'react-bootstrap'
import ModalDialog from 'components/atoms/Modal'
import { IReportTypes } from 'types/interfaces'

const AdminOrgnism: FC = () => {
  const {
    tableData,
    getTimeSheet,
    visible,
    setVisible,
    handleApproveOrReject,
    setSelectedReportType,
    selectedReportType,
  } = useHandleAdminAction()
  useEffect(() => {
    getTimeSheet(selectedReportType)
  }, [selectedReportType])

  return (
    <Container>
      <Row className='mb-3'>
        <Form.Group as={Col} md={6} controlId='formGridState'>
          <Form.Label>Select Type</Form.Label>
          <Form.Select
            defaultValue='Choose...'
            value={selectedReportType}
            onChange={(e) => setSelectedReportType(e.target.value)}
          >
            {reportTypes.map((el: IReportTypes, index) => {
              return (
                <option key={index} value={el.value}>
                  {el.key}
                </option>
              )
            })}
          </Form.Select>
        </Form.Group>
      </Row>
      <Row className='mb-3'>
        <TimeSheetTable headers={headers} tableData={tableData} view={''} />
      </Row>
      {visible && (
        <ModalDialog
          visible={visible}
          handleModal={(value) => {
            setVisible(value)
          }}
          handleSubmit={() => {
            return
          }}
          heading={'Are you sure want to perform action?'}
          isFooter={false}
        >
          <Row className='mb-3'>
            <Button
              className='mb-3'
              variant='secondary'
              onClick={() => {
                handleApproveOrReject('approved')
              }}
            >
              Approve
            </Button>
            <Button
              variant='primary'
              onClick={() => {
                handleApproveOrReject('rejected')
              }}
            >
              Reject
            </Button>
          </Row>
        </ModalDialog>
      )}
    </Container>
  )
}

export default AdminOrgnism
