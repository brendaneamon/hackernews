import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { SORTS } from '../../utils'
import { SortHeader } from '..';

const Table = ({ list, sortKey, isSortReverse, onSort, onDismiss }) =>
  <div className="table">
    <div className="table-header">
      <span className="width-40">
        <SortHeader
          sortKey={'TITLE'}
          onSort={onSort}
        >
          Title
        </SortHeader>
      </span>
      <span className="width-30">
        <SortHeader
          sortKey={'AUTHOR'}
          onSort={onSort}
        >
          Author
        </SortHeader>
      </span>
      <span className="width-10">
        <SortHeader
          sortKey={'COMMENTS'}
          onSort={onSort}
        >
          Comments
        </SortHeader>
      </span>
      <span className="width-10">
        <SortHeader
          sortKey={'POINTS'}
          onSort={onSort}
        >
          Points
        </SortHeader>
      </span>
      <span className="width-10"></span>
    </div>
    {SORTS[sortKey](list, isSortReverse).map(item =>
      <div key={item.objectID} className="table-row">
        <span className="width-40">
          <a href={item.url}>
            {item.title}
          </a>
        </span>
        <span className="width-30">
          {item.author}
        </span>
        <span className="width-10">
          {item.num_comments}
        </span>
        <span className="width-10">
          {item.points}
        </span>
        <span>
          <Button
            className="button-inline"
            onClick={() => onDismiss(item.objectID)}
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>

Table.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      objectID: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string,
      num_comments: PropTypes.number,
      points: PropTypes.number
    })
  ).isRequired,
  onDismiss: PropTypes.func.isRequired
}

export default Table
