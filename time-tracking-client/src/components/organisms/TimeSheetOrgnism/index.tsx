import TimeSheetTable from 'components/molecules/TimeSheetTable'
import { Row, Form, Col, Tabs, Tab } from 'react-bootstrap'
import useHandleTimeSheet from 'hooks/useHandleTimeSheet'
import { useEffect, useMemo, useState } from 'react'
import { headers, headers2 } from 'constant'
import useHandleProjectTaskData from 'hooks/useHandleProjectTaskData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatTime } from 'utils'
import Button from 'components/atoms/Button'
import ModalDialog from 'components/atoms/Modal'
import './styles.css'

const TimeSheetOrgnism = () => {
  const [key, setKey] = useState('task')
  const {
    fetchAllProjects,
    fetchAllTask,
    allProjects,
    allTaskByProjectId,
    setSelectedProject,
    setSelectedTask,
    selectedProject,
    selectedTask,
    setSelectedTaskForEdit,
    setSelectedProjectForEdit,
    selectedTaskForEdit,
    selectedProjectForEdit,
    allTaskForEdit,
    fetchAllTaskForEdit,
  } = useHandleProjectTaskData();

  const {
    tableData,
    getTimeSheet,
    setEndDate,
    setStartDate,
    setView,
    endDate,
    startDate,
    getTimeSheetByView,
    view,
    setTableData,
    visible,
    setVisible,
    timeDuration,
    setComment,
    setTimeDuration,
    setSelectedDate,
    selectedDate,
    duration,
    comment,
    handleUpdateEditEntry,
    innerTableData,
    formErrors,
    setInnerTableData,
  } = useHandleTimeSheet({ setSelectedTaskForEdit, setSelectedProjectForEdit, fetchAllTaskForEdit, key })

  useEffect(() => {
    fetchAllProjects()
    fetchAllTask('all')
  }, [])

  useEffect(() => {
    const ids: any = {
      task: selectedTask,
      project: selectedProject,
    }
    if (ids?.[key]) {
      getTimeSheet(key, ids?.[key])
    }
  }, [key, selectedProject, selectedTask])

  const totalHors = useMemo(() => {
    const diff = tableData
      .map((el: any) => {
        return el.duration
      })
      .reduce((acc, val) => {
        return acc + val
      }, 0)

    return formatTime(diff)
  }, [tableData])

  const selectFormOfData = (value: string) => {
    if (value !== key) {
      setKey(value)
      setSelectedTask('')
      setSelectedProject('')
      setTableData([])
      setInnerTableData([])
    }
  }

  useEffect(() => {
    if (key === 'task') {
      setSelectedTask(allTaskByProjectId?.[0]?.id)
    }
    if (key === 'project') {
      setSelectedProject(allProjects?.[0]?.id)
    }
  }, [allTaskByProjectId, key, allProjects])

  return (
    <div>
      <Row className='mb-3'>
        <Col md={12}>
          <Tabs
            activeKey={key}
            id='uncontrolled-tab-example'
            className='mb-3 custom-timesheet-tab'
            onSelect={(value) => selectFormOfData(value as string)}
          >
            <Tab eventKey='task' title='View logs by task'>
              <Row>
                <Form.Group as={Col} md={3} controlId='formGridState'>
                  <Form.Label>Select Task</Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    value={selectedTask}
                    onChange={(e) => setSelectedTask(e.target.value)}
                  >
                    <option>Choose...</option>
                    {allTaskByProjectId.map((el: any, index: number) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.task_name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
                <Col md={9} className='d-flex justify-content-end align-items-end'>
                  <h6 className='total-hours'>Total hours: {totalHors}</h6>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey='project' title='View logs by project'>
              <Row>
                <Form.Group as={Col} md={3} controlId='formGridState'>
                  <Form.Label>Select Project</Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                  >
                    <option>Choose...</option>
                    {allProjects.map((el: any, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
                <Col md={9} className='d-flex justify-content-end align-items-end'>
                  <h6 className='total-hours'>Total hours: {totalHors}</h6>
                </Col>
              </Row>
            </Tab>
            <Tab eventKey='view' title='View logs by duration'>
              <Row>
                <Form.Group as={Col} md={3} controlId='formGridEmail'>
                  <Form.Label>From</Form.Label>
                  <DatePicker
                    selected={startDate}
                    maxDate={new Date()}
                    className='form-control'
                    onChange={(date: any) => {
                      setStartDate(date)
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col} md={3} controlId='formGridEmail'>
                  <Form.Label>TO</Form.Label>
                  <DatePicker
                    selected={endDate}
                    maxDate={new Date()}
                    className='form-control'
                    onChange={(date: any) => {
                      setEndDate(date)
                    }}
                  />
                </Form.Group>

                <Form.Group as={Col} md={3} controlId='formGridState'>
                  <Form.Label>Select view</Form.Label>
                  <Form.Select
                    value={view}
                    onChange={(e) => {
                      e.target.value !== 'Choose....' && setView(e.target.value)
                    }}
                  >
                    <option>Choose....</option>
                    <option value={'week'}>Week</option>
                    <option value={'month'}>Month</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} md={3} className='d-flex justify-content-end align-items-end'>
                  <Button text='Get report' onClick={() => getTimeSheetByView()} />
                </Form.Group>
              </Row>
            </Tab>
          </Tabs>
        </Col>
      </Row>
      <Row className='mb-3'>
        <Col md={12}>
          {key === 'view' ? (
            <>
              {innerTableData.length ? (
                <TimeSheetTable headers={headers2} tableData={innerTableData} view={key} />
              ) : null}
            </>
          ) : null}
          {tableData.length ? (
            <TimeSheetTable headers={headers} tableData={tableData} view={''} />
          ) : null}
        </Col>
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
          heading={'Edit entries'}
          isFooter={false}
        >
          <Row className='mb-3'>
            <Form className='request-form-update-form'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridState' className='col-md-12 mb-3'>
                  <Form.Label>
                    Select project <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    value={selectedProjectForEdit}
                    onChange={({ target: { value } }) => {
                      value !== 'Choose...' && fetchAllTaskForEdit(value)
                    }}
                  >
                    <option>Choose...</option>
                    {allProjects.map((el: any, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.name}
                        </option>
                      )
                    })}
                  </Form.Select>
                  {formErrors?.project && (
                    <Form.Text className='text-danger'>{formErrors?.project}</Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState' className='col-md-6'>
                  <Form.Label>
                    Select task <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    value={selectedTaskForEdit}
                    onChange={({ target: { value } }) => {
                      setSelectedTaskForEdit(value as string)
                    }}
                  >
                    <option>Choose...</option>
                    {allTaskForEdit.map((el: any, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.task_name}
                        </option>
                      )
                    })}
                  </Form.Select>
                  {formErrors?.task && (
                    <Form.Text className='text-danger'>{formErrors?.task}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId='formGridEmail' className='col-md-6'>
                  <Form.Label>
                    Select date <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    maxDate={new Date()}
                    className='form-control'
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridPassword' className='col-md-6'>
                  <Form.Label>
                    Select start time <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <DatePicker
                    selected={timeDuration.startTime}
                    onChange={(date) => setTimeDuration({ ...timeDuration, startTime: date })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                    className='form-control'
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPassword' className='col-md-6'>
                  <Form.Label>
                    Select end time <span style={{ color: 'red' }}>*</span>
                  </Form.Label>
                  <DatePicker
                    selected={timeDuration.endTime}
                    onChange={(date) => setTimeDuration({ ...timeDuration, endTime: date })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                    className='form-control'
                  />
                  {formErrors?.duration && (
                    <Form.Text className='text-danger'>{formErrors?.duration}</Form.Text>
                  )}
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPassword' className='col-md-6 mt-3'>
                  <Form.Label>Duration</Form.Label>
                  <div style={{ color: 'black' }}>{formatTime(duration)}</div>
                </Form.Group>
              </Row>

              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={5}
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                />
              </Form.Group>

              <Button
                text='Submit Request'
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  handleUpdateEditEntry(selectedProjectForEdit, selectedTaskForEdit)
                }}
              />
            </Form>
          </Row>
        </ModalDialog>
      )}
    </div>
  )
}

export default TimeSheetOrgnism
