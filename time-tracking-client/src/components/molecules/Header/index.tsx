import { useAppDispatch } from 'hooks'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import { SetLoggedInUserDetails } from 'store/action/common'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const viewStyles: any = {
    padding: '10px 20px ',
    borderBottom: '1px solid rgb(35, 50, 66)',
    background: '#2A3F54',
    position: 'relative',
  }

  const headingStyles: any = {
    margin: '0',
    fontSize: '20px',

    textTransform: 'capitalize',
    color: '#ffffff',
  }
  const userStyles: any = {
    margin: '0',
    fontSize: '18px',
    color: '#ffffff',
    fontWeight: '500',
  }

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
          <i className='fa fa-fw fa-user-o'></i> Hello, {'username'}
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
