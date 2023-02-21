import { FC } from 'react'
import { Link } from 'react-router-dom'

interface IMenuItemProps {
  title: string
  icon: string
  path: string
}

const MenuItem: FC<IMenuItemProps> = ({ title, icon, path }) => {
  const menuItemStyle: any = {
    display: 'block',
    padding: '16px',
    color: '#333',
    borderBottom: '1px solid #e2e8f0',
    textDecoration: 'none',
    fontSize: '16px',
  }

  const iconStyle = {
    marginRight: '10px',
  }

  return (
    <Link to={path} style={menuItemStyle}>
      <i className={'fa fa-fw fa-' + icon} style={iconStyle}></i>
      {title}
    </Link>
  )
}

export default MenuItem
