import React, { Component } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { Search, Table } from './components'
import { ButtonWithLoading } from './higher-order-components'
import { cache, getSearchResults } from './services/api'
import './App.css'

library.add(faSpinner)

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      cacheKey: null,
      error: null,
      loading: false,
      result: null,
      searchTerm: 'redux',
      sortKey: 'NONE'
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onSort = this.onSort.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
  }

  onDismiss(id) {
    const { cacheKey } = this.state
    const { hits, page } = cache.get(cacheKey)

    const result = {
      page,
      hits: hits.filter(item => item.objectID !== id)
    }
    cache.set(cacheKey, result)
    this.setState({ result })
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value })
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.setState({ cacheKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  onSort(sortKey) {
    this.setState({ sortKey })
  }

  fetchSearchTopStories(searchTerm, page = 0) {
    getSearchResults(searchTerm, page).then(result => {
      if (this._isMounted) {
        this.setState({ result })
      }
    }).catch(error => {
      if (this._isMounted) {
        this.setState({ error })
        console.error(error)
      }
    }).finally(() => {
      this.setState({ loading: false })
    })
  }

  componentDidMount() {
    this._isMounted = true
    this.setState({ loading: true })
    const { searchTerm } = this.state
    this.setState({ cacheKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const {
      searchTerm,
      result,
      error,
      loading,
      sortKey
    } = this.state
    let page = 0
    if (result && result.page) {
      page = +result.page
    }

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
            onSubmit={this.onSearchSubmit}
          >
            {'Search '}
          </Search>
        </div>
        {error &&
          <div className="centered-content padding-2">
            ERROR: problem getting data from Hacker News API
          </div>
        }
        {result && !loading &&
          <Table
            list={result.hits}
            sortKey={sortKey}
            onSort={this.onSort}
            onDismiss={this.onDismiss}
          />
        }
        <div className="interactions">
          {!error &&
            <ButtonWithLoading
              loading={loading}
              onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
            >
              More
            </ButtonWithLoading>
          }
        </div>
      </div>
    )
  }
}

export default App
