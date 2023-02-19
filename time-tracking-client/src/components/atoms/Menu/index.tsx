import { useAppSelector } from 'hooks'
import MenuItem from '../MenuItem'

const Menu = () => {
  const role = useAppSelector((state) => state.common?.loggedInUserData?.role)
  const navStyle = {
    display: 'block',
    width: '100%',
  }

  const pages = [
    ...(role === 'admin'
      ? [
          {
            name: 'Users Times heet',
            icon: 'file',
            path: '/admin',
          },
        ]
      : [
          {
            name: 'Create request',
            icon: 'clock-o',
            path: '/create-request',
          },
          {
            name: 'Time Sheet',
            icon: 'file',
            path: '/timesheet',
          },
        ]),
  ]
  return (
    <nav style={navStyle}>
      {pages.map((page) => {
        return <MenuItem title={page.name} icon={page.icon} path={page.path} key={page.name} />
      })}
    </nav>
  )
}

export default Menu
