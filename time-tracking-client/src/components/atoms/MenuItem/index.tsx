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
    padding: '10px',
    paddingLeft: '30px',
    color: '#fdfdfd',
    margin: '0 -12px',
    borderBottom: '1px solid rgb(35, 50, 66)',
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
