import { HttpStatusCode, APIEndpoints } from 'constant'
import { useAppDispatch } from 'hooks'
import { useState } from 'react'
import { POST } from 'services/httpService'
import { SetLoggedInUserDetails } from 'store/action/common'
import { notifyToast } from 'utils'
import { useNavigate } from 'react-router-dom'

const useLogin = () => {
  const navigate = useNavigate()
  const initialState = {
    username: '',
    password: '',
  }

  const [userState, setUserState] = useState(initialState)
  const dispatch = useAppDispatch()
  const onSubmit = async () => {
    try {
      const payload = {
        ...userState,
      }
      const response = await POST({ subUrl: APIEndpoints.authentication.login, data: payload })
      if (response.status === HttpStatusCode.Ok) {
        dispatch(SetLoggedInUserDetails(response.data))
        notifyToast({
          message: 'Login successfully',
          type: 'success',
        })
        navigate('/create-request')
      }
    } catch (error) {
      notifyToast({
        message: 'Unknown error',
        type: 'error',
      })
    }
  }

  return {
    userState,
    setUserState,
    onSubmit,
  }
}

export default useLogin
