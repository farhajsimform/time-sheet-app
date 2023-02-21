import React, { FC } from 'react'
import Menu from 'components/atoms/Menu'
import Sidebar from 'components/atoms/Sidebar'
import Header from '../Header'
import { viewStyles } from './styles'

interface ILayoutProps {
  children: React.ReactNode
  title?: string
}
const Layout: FC<ILayoutProps> = ({ children, title }) => {
  return (
    <div>
      <Header />
      <div className='d-flex'>
        <Sidebar>
          <Menu />
        </Sidebar>
        <div style={viewStyles}>
          <h1 className='layout-page-title'>{title}</h1>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
