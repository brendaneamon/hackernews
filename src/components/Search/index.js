import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'

class Search extends Component {
  componentDidMount() {
    if (this.node) {
      this.node.focus()
    }
  }

  render() {
    const {
      value,
      onChange,
      onSubmit,
      children
    } = this.props

    return (
      <form>
        {children}
        <input
          type="text"
          value={value}
          onChange={onChange}
          ref={(node) => { this.node = node }}
        />
        <Button
          onClick={(e) => onSubmit(e)}
          type="submit"
        >
          Submit
        </Button>
      </form>
    )
  }
}

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
}

export default Search
