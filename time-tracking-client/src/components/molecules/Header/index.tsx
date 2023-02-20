import { useAppDispatch, useAppSelector } from 'hooks'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { SetLoggedInUserDetails } from 'store/action/common'
import { headingStyles, viewStyles, userStyles } from './styles'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.common.loggedInUserData?.username)
  const navigate = useNavigate()

  const LogOutUser = () => {
    dispatch(SetLoggedInUserDetails(null))
    navigate('/')
  }
  return (
    <Row style={viewStyles}>
      <Col md={5}>
        <h2 style={headingStyles}> time tracking app</h2>
      </Col>
      <Col md={5}>
        <h3 style={userStyles}>
          {' '}
          <i className='fa fa-fw fa-user-o'></i> Hello, {username}
        </h3>
      </Col>
      <Col md={2} className='d-flex justify-content-end'>
        <h6
          className='logout-btn'
          onClick={() => {
            LogOutUser()
          }}
        >
          Logout
        </h6>
      </Col>
    </Row>
  )
}

export default Header
