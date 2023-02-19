import { FC } from 'react'
import { FormControlProps, Form } from 'react-bootstrap'

interface ITextInputProps extends FormControlProps {
  error?: string
  label?: string
  rows?: number
  name?: string
  controlId: string
}
const TextInput: FC<ITextInputProps> = ({ label, error, controlId, ...props }) => {
  return (
    <Form.Group className='mb-3' controlId={controlId}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control {...props} />
      {error && <Form.Text className='text-danger'>{error}</Form.Text>}
    </Form.Group>
  )
}

export default TextInput
