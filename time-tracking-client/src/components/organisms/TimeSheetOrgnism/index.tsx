import TimeSheetTable from 'components/molecules/TimeSheetTable'
import { Row, Container, Form, Col, Tabs, Tab } from 'react-bootstrap'
import useHandleTimeSheet from 'hooks/useHandleTimeSheet'
import { useEffect, useMemo, useState } from 'react'
import { headers, headers2 } from 'constant'
import useHandleProjectTaskData from 'hooks/useHandleProjectTaskData'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { formatTime } from 'utils'
import Button from 'components/atoms/Button'
import ModalDialog from 'components/atoms/Modal'

const TimeSheetOrgnism = () => {
  const [key, setKey] = useState('task')
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
  } = useHandleTimeSheet()
  const {
    fetchAllProjects,
    fetchAllTask,
    allProjects,
    allTaskByProjectId,
    setSelectedProject,
    setSelectedTask,
    selectedProject,
    selectedTask,
  } = useHandleProjectTaskData()

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
    }
  }

  return (
    <Container>
      <Row className='mb-3'>
        <Tabs
          activeKey={key}
          id='uncontrolled-tab-example'
          className='mb-3'
          onSelect={(value) => selectFormOfData(value as string)}
        >
          <Tab eventKey='task' title='Under the task'>
            <Row>
              <Form.Group as={Col} md={8} controlId='formGridState'>
                <Form.Label>Select Task</Form.Label>
                <Form.Select
                  defaultValue='Choose...'
                  value={selectedTask}
                  onChange={(e) => setSelectedTask(e.target.value)}
                >
                  <option>Choose...</option>
                  {allTaskByProjectId.map((el: any, index) => {
                    return (
                      <option key={index} value={el.id}>
                        {el.task_name}
                      </option>
                    )
                  })}
                </Form.Select>
              </Form.Group>
              <Col md={4} className='d-flex justify-content-end align-items-end'>
                <h6 className='total-hours'>Total hours: {totalHors}</h6>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey='project' title='Under the project'>
            <Row>
              <Form.Group as={Col} md={8} controlId='formGridState'>
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
              <Col md={4} className='d-flex justify-content-end align-items-end'>
                <h6 className='total-hours'>Total hours: {totalHors}</h6>
              </Col>
            </Row>
          </Tab>
          <Tab eventKey='view' title='Week/Month view'>
            <Row>
              <Form.Group as={Col} md={3} controlId='formGridEmail'>
                <Form.Label>From</Form.Label>
                <DatePicker
                  selected={startDate}
                  maxDate={new Date()}
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
      </Row>
      <Row className='mb-3'>
        <TimeSheetTable
          headers={key === 'view' ? headers2 : headers}
          tableData={tableData}
          view={key}
        />
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
            <Form className='request-form'>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Select project</Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    onChange={({ target: { value } }) => {
                      value !== 'Choose...' && fetchAllTask(value)
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
                </Form.Group>

                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Label>Select task</Form.Label>
                  <Form.Select
                    defaultValue='Choose...'
                    onChange={({ target: { value } }) => {
                      setSelectedTask(value)
                    }}
                  >
                    <option>Choose...</option>
                    {allTaskByProjectId.map((el: any, index) => {
                      return (
                        <option key={index} value={el.id}>
                          {el.task_name}
                        </option>
                      )
                    })}
                  </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId='formGridEmail'>
                  <Form.Label>Select date</Form.Label>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    maxDate={new Date()}
                  />
                </Form.Group>
              </Row>
              <Row className='mb-3'>
                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Select start time</Form.Label>
                  <DatePicker
                    selected={timeDuration.startTime}
                    onChange={(date) => setTimeDuration({ ...timeDuration, startTime: date })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Select end time</Form.Label>
                  <DatePicker
                    selected={timeDuration.endTime}
                    onChange={(date) => setTimeDuration({ ...timeDuration, endTime: date })}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption='Time'
                    dateFormat='h:mm aa'
                  />
                </Form.Group>
                <Form.Group as={Col} controlId='formGridPassword'>
                  <Form.Label>Duration</Form.Label>
                  <div>{duration}</div>
                </Form.Group>
              </Row>

              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Comment</Form.Label>
                <Form.Control as='textarea' rows={3} onChange={(e) => setComment(e.target.value)} />
              </Form.Group>

              <Button
                text='Submit Request'
                type='submit'
                onClick={(e) => {
                  e.preventDefault()
                  // createTimeLogRequest(selectedProject, selectedTask)
                }}
              />
            </Form>
          </Row>
        </ModalDialog>
      )}
    </Container>
  )
}

export default TimeSheetOrgnism