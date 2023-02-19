import React, { FC } from 'react'
import Menu from 'components/atoms/Menu'
import Sidebar from 'components/atoms/Sidebar'
import Header from '../Header'

interface ILayoutProps {
  children: React.ReactNode
}
const Layout: FC<ILayoutProps> = ({ children }) => {
  const viewStyles: any = {
    // marginLeft: '230px',
    padding: '80px 20px 0',
  }
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
