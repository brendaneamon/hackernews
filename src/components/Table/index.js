import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '../Button'
import { SORTS } from '../../utils'
import { SortHeader } from '..';

class Table extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isSortReverse: false,
      sortKey: 'NONE'
    }

    this.onSort = this.onSort.bind(this)
  }

  onSort(sortKey) {
    const isSortReverse = this.state.sortKey === sortKey && !this.state.isSortReverse
    this.setState({ sortKey, isSortReverse })
  }

  render() {
    const {
      isSortReverse,
      sortKey
    } = this.state

    const {
      list,
      onDismiss
    } = this.props

    return (
      <div className="table">
        <div className="table-header">
          <span className="width-40">
            <SortHeader
              sortKey={'TITLE'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Title
            </SortHeader>
          </span>
          <span className="width-30">
            <SortHeader
              sortKey={'AUTHOR'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Author
            </SortHeader>
          </span>
          <span className="width-10">
            <SortHeader
              sortKey={'COMMENTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
            >
              Comments
            </SortHeader>
          </span>
          <span className="width-10">
            <SortHeader
              sortKey={'POINTS'}
              onSort={this.onSort}
              activeSortKey={sortKey}
              isSortReverse={isSortReverse}
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
    )
  }
}

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
