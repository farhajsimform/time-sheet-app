import { FC } from 'react'
import Button from 'components/atoms/Button'
import TextInput from 'components/atoms/Input'
import useLogin from 'hooks/useLogin'

const LoginForm: FC = () => {
  const { userState, setUserState, onSubmit } = useLogin()
  return (
    <div>
      <TextInput
        controlId='usernameId'
        placeholder='Enter username'
        type='text'
        value={userState.username}
        onChange={(e) => {
          setUserState({ ...userState, username: e.target.value })
        }}
      />

      <TextInput
        controlId='passwordId'
        placeholder='Enter password'
        type='password'
        value={userState.password}
        onChange={(e) => {
          setUserState({ ...userState, password: e.target.value })
        }}
      />

      <Button
        type='submit'
        text='Login'
        className='btn btn-secondary btn-block login-button'
        onClick={onSubmit}
      />
    </div>
  )
}

export default LoginForm
