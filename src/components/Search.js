import React from 'react'
import Button from './Button'

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

export default Search
