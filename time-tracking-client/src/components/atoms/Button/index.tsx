import React, { FC } from 'react'
import { Button as BButton, ButtonProps } from 'react-bootstrap'

interface IButtonProps extends ButtonProps {
  text: string
  iconPrefix?: React.ReactNode
  iconPostfix?: React.ReactNode
  className?: string
}

const Button: FC<IButtonProps> = ({ text, iconPostfix, iconPrefix, ...rest }) => {
  return (
    <BButton {...rest}>
      {iconPrefix && iconPrefix}
      {text}
      {iconPrefix && iconPostfix}
    </BButton>
  )
}
export default Button
