import React, { FC } from 'react'

interface ISidebarProps {
  children: React.ReactNode
}
const Sidebar: FC<ISidebarProps> = ({ children }) => {
  const sidebarStyle: any = {
    // position: 'absolute',
    // width: '230px',
    height: '100vh',
    background: '#2A3F54',
    zIndex: 9999,
    display: 'flex',
  }

  return (
    <div className='sidebar col-md-2' style={sidebarStyle}>
      {children}
    </div>
  )
}

export default Sidebar
