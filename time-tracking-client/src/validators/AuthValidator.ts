import * as yup from 'yup'

export const UsernamePasswordAuthValidator = yup.object().shape({
  email: yup.string().required('Please enter a valid email'),
  password: yup.string().required('Please enter a valid password'),
})
