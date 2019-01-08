import React from 'react'
import Button from '../Button'

const SortHeader = ({ sortKey, onSort, children }) =>
  <Button
    className="button-inline"
    onClick={() => onSort(sortKey)}
  >
    {children}
  </Button>

export default SortHeader
