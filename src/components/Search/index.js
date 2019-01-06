import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

const Search = ({ value, onChange, onSubmit, children }) =>
  <form>
    {children}
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <Button
      onClick={(e) => onSubmit(e)}
      type="submit"
    >
      Submit
    </Button>
  </form>

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Search
