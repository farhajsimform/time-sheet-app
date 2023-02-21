import { FC, useEffect } from 'react'
import Button from 'components/atoms/Button'
import { Form, Row, Col } from 'react-bootstrap'
import DatePicker from 'react-datepicker'
import useHandleProjectTaskData from 'hooks/useHandleProjectTaskData'
import 'react-datepicker/dist/react-datepicker.css'
import useCreateTimeSheet from 'hooks/useCreateTimeSheet'
import { formatTime } from 'utils'

const CreateRequestForm: FC = () => {
  const {
    allProjects,
    fetchAllTask,
    allTaskByProjectId,
    setSelectedTask,
    selectedProject,
    selectedTask,
    fetchAllProjects,
    setSelectedProject,
  } = useHandleProjectTaskData()
  const {
    selectedDate,
    setSelectedDate,
    timeDuration,
    setTimeDuration,
    duration,
    createTimeLogRequest,
    setComment,
    formErrors,
    comment,
  } = useCreateTimeSheet({ setSelectedTask, setSelectedProject })

  useEffect(() => {
    fetchAllProjects()
  }, [])

  return (
    <Form className='request-form'>
      <Row className='mb-3'>
        <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>
            Select project <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Select
            defaultValue='Choose...'
            value={selectedProject}
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
          {formErrors?.project && (
            <Form.Text className='text-danger'>{formErrors?.project}</Form.Text>
          )}
        </Form.Group>

        <Form.Group as={Col} controlId='formGridState'>
          <Form.Label>
            Select task <span style={{ color: 'red' }}>*</span>
          </Form.Label>
          <Form.Select
            defaultValue='Choose...'
            value={selectedTask}
            onChange={({ target: { value } }) => {
              setSelectedTask(value)
            }}
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
          {formErrors?.task && <Form.Text className='text-danger'>{formErrors?.task}</Form.Text>}
        </Form.Group>
        <Form.Group as={Col} controlId='formGridEmail'>
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
        <Form.Group as={Col} controlId='formGridPassword'>
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
        <Form.Group as={Col} controlId='formGridPassword'>
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
        <Form.Group as={Col} controlId='formGridPassword'>
          <Form.Label>Duration</Form.Label>
          <div>{formatTime(duration)}</div>
        </Form.Group>
      </Row>

      <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
        <Form.Label>Comment</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
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
