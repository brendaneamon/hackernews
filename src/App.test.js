import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import App from './App'
import { Search, Button, Table } from './components'

Enzyme.configure({ adapter : new Adapter() })

let component
let div
let element
let tree

describe('App', () => {
  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<App />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(<App />)
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Search', () => {
  const searchProps = {
    onChange() {},
    onSubmit() {}
  }

  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Search { ...searchProps }>Search</Search>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Search { ...searchProps }>Search</Search>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Button', () => {
  const btnProps = {
    className: 'fake-class',
    onClick() {}
  }

  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Button { ...btnProps }>Button Text</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Button { ...btnProps }>
        Button Text
      </Button>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has the expected type', () => {
    element = shallow(
      <Button { ...btnProps }>
        Button Text
      </Button>
    )

    expect(element.text()).toBe('Button Text')
  })
})

describe('Table', () => {
  const tableProps = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'a' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'b' }
    ]
  }

  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Table { ...tableProps } />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Table { ...tableProps }/>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('shows two items in the list', () => {
    element = shallow(
      <Table { ...tableProps }/>
    )
    const list = element.find('.table-row')

    expect(list.length).toBe(2)
  })
})
