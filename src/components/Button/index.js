import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
  onClick,
  children,
  className,
  type,
}) =>
  <button
    onClick={onClick}
    className={className}
    type={type}
  >
    {children}
  </button>

Button.defaultProps = {
  className: '',
  type: 'button'
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  type: PropTypes.string
}

export default Button
