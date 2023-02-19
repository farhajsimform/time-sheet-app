import TimeSheetTable from 'components/molecules/TimeSheetTable'
import { headers } from 'constant'
import useHandleAdminAction from 'hooks/useHandleAdminAction'
import { FC, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import ModalDialog from 'components/atoms/Modal'

const AdminOrgnism: FC = () => {
  const { tableData, getTimeSheet, visible, setVisible, handleApproveOrReject } =
    useHandleAdminAction()
  useEffect(() => {
    getTimeSheet()
  }, [])

  return (
    <Container>
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
