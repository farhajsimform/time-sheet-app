import { FC, useEffect } from 'react'
import Button from 'components/atoms/Button'
import { Form, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import useHandleProjectTaskData from 'hooks/useHandleProjectTaskData'
import 'react-datepicker/dist/react-datepicker.css'
import useCreateTimeSheet from 'hooks/useCreateTimeSheet'

const CreateRequestForm: FC = () => {
  const {
    allProjects,
    fetchAllTask,
    allTaskByProjectId,
    setSelectedTask,
    selectedProject,
    selectedTask,
    fetchAllProjects,
  } = useHandleProjectTaskData()
  const {
    selectedDate,
    setSelectedDate,
    timeDuration,
    setTimeDuration,
    duration,
    createTimeLogRequest,
    setComment,
  } = useCreateTimeSheet()

  useEffect(() => {
    fetchAllProjects()
  }, [])

  return (
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
          createTimeLogRequest(selectedProject, selectedTask)
        }}
      />
    </Form>
  )
}

export default CreateRequestForm
