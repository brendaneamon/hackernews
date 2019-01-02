import React, { Component } from 'react'
import Button from './components/Button'
import Search from './components/Search'
import Table from './components/Table'
import { cache, getSearchResults } from './services/api'
import './App.css'

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props)

    this.state = {
      cacheKey: null,
      error: null,
      result: null,
      searchTerm: 'redux'
    }

    this.onSearchChange = this.onSearchChange.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
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
    })
  }

  componentDidMount() {
    this._isMounted = true
    const { searchTerm } = this.state
    this.setState({ cacheKey: searchTerm })
    this.fetchSearchTopStories(searchTerm)
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  render() {
    const { searchTerm, result, error } = this.state
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
          <p>
            ERROR: problem getting data from Hacker News API
          </p>
        }
        {result &&
          <Table
            list={result.hits}
            onDismiss={this.onDismiss}
          />
        }
        {result &&
          <div className="interactions">
            <Button
              onClick={() => this.fetchSearchTopStories(searchTerm, page + 1)}
            >
              More
            </Button>
          </div>
        }
      </div>
    )
  }
}

export default App
