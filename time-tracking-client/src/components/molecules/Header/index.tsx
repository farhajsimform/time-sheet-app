import { useAppDispatch, useAppSelector } from 'hooks'
import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Nav, NavDropdown } from 'react-bootstrap'
import { SetLoggedInUserDetails } from 'store/action/common'
import { headingStyles, viewStyles } from './styles'

const Header: FC = () => {
  const dispatch = useAppDispatch()
  const username = useAppSelector((state) => state.common.loggedInUserData?.username)
  const navigate = useNavigate()

  const LogOutUser = () => {
    dispatch(SetLoggedInUserDetails(null))
    navigate('/')
  }
  return (
    <div style={viewStyles}>
      <h2 style={headingStyles}> time tracking app</h2>
      <Nav className='ms-auto nav-user-dropdown'>
        <NavDropdown
          title={
            <>
              {' '}
              <i className='fa fa-fw fa-user-o'></i> Hello, {username}
            </>
          }
          id='basic-nav-dropdown'
        >
          <NavDropdown.Item
            onClick={() => {
              LogOutUser()
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>

      {/* <Col md={2} className='d-flex justify-content-end'>
        <h6
          className='logout-btn'
          onClick={() => {
            LogOutUser()
          }}
        >
          Logout
        </h6>
      </Col> */}
    </div>
  )
}

export default Header
