import React, { FC } from 'react'

interface ISidebarProps {
  children: React.ReactNode
}
const Sidebar: FC<ISidebarProps> = ({ children }) => {
  const sidebarStyle: any = {
    height: 'calc(100vh - 61px)',
    display: 'flex',
    width: '250px',
    background: ' #FFFFFF',
    boxShadow: 'inset -2px 0px 8px rgba(0, 0, 0, 0.04)',
  }

  return (
    <div className='sidebar' style={sidebarStyle}>
      {children}
    </div>
  )
}

export default Sidebar
