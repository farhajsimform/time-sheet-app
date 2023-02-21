import { FC } from 'react'
import LoginForm from 'components/molecules/LoginForm/LoginForm'
import './styles.css'

const LoginOrgnism: FC = () => {
  return (
    <div className='login-form'>
      <div className='form-box'>
        <div className='header-form'>
          <h4 className='text-primary text-center'>
            <i className='fa fa-user-circle' style={{ fontSize: '110px' }}></i>
          </h4>
          <div className='image'></div>
        </div>
        <div className='body-form'>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginOrgnism
