import React from 'react'

const Button = ({
  onClick,
  children,
  className = '',
  type = 'button'
}) =>
  <button
    onClick={onClick}
    className={className}
    type={type}
  >
    {children}
  </button>


export default Button
