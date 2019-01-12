import React from 'react'
import Button from '../Button'

const SortHeader = ({ sortKey, activeSortKey, onSort, children }) => {
  let classString = 'button-inline'
  if (sortKey === activeSortKey) {
    classString += ' button-active'
  }

  return (
  <Button
    className={classString}
    onClick={() => onSort(sortKey)}
  >
    {children}
  </Button>
  )
}

export default SortHeader
