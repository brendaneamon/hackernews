import React from 'react'
import Button from './Button'

const Table = ({ list, onDismiss }) =>
  <div className="table">
    {list.map(item =>
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

export default Table
