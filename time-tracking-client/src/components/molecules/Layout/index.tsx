import React, { FC } from 'react'
import Menu from 'components/atoms/Menu'
import Sidebar from 'components/atoms/Sidebar'
import Header from '../Header'
import { viewStyles } from './styles'

interface ILayoutProps {
  children: React.ReactNode
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  return (
    <div>
      <Header />
      <div className='row'>
        <Sidebar>
          <Menu />
        </Sidebar>
        <div className=' col-md-10' style={viewStyles}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
