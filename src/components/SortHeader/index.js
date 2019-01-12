import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../Button'

const SortHeader = ({ sortKey, activeSortKey, isSortReverse, onSort, children }) => {
  const active = sortKey === activeSortKey
  let classString = 'button-inline'
  if (active) {
    classString += ' button-active'
  }

  const arrowIcon = isSortReverse && active ? 'angle-up' : 'angle-down'

  return (
    <div className="flex flex-justify-start">
      <Button
        className={classString}
        onClick={() => onSort(sortKey)}
      >
        {children}
      </Button>
      <div className="padding-horizontal-1">
        <FontAwesomeIcon icon={arrowIcon} />
      </div>
    </div>
  )
}

export default SortHeader
