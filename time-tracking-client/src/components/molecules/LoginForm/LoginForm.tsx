import { FC } from 'react'
import Button from 'components/atoms/Button'
import TextInput from 'components/atoms/Input'
import useLogin from 'hooks/useLogin'

const LoginForm: FC = () => {
  const { userState, setUserState, onSubmit, formErrors } = useLogin()
  return (
    <div>
      <TextInput
        controlId='usernameId'
        placeholder='Enter username'
        type='text'
        value={userState.username}
        error={formErrors?.username}
        onChange={(e) => {
          setUserState({ ...userState, username: e.target.value })
        }}
      />

      <TextInput
        controlId='passwordId'
        placeholder='Enter password'
        type='password'
        value={userState.password}
        error={formErrors?.password}
        onChange={(e) => {
          setUserState({ ...userState, password: e.target.value })
        }}
      />

      <Button
        type='submit'
        text='Login'
        className='btn btn-primary btn-block login-button'
        onClick={onSubmit}
      />
    </div>
  )
}

export default LoginForm
