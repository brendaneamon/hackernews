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
let props
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
  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Search>Search</Search>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Search>Search</Search>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Button', () => {
  props = {
    className: 'fake-class',
    onClick() {}
  }

  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Button>Button Text</Button>, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Button>Button Text</Button>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('has the expected type', () => {
    element = shallow(
      <Button { ...props }>
        Button Text
      </Button>
    )

    expect(element.text()).toBe('Button Text')
  })
})

describe('Table', () => {
  props = {
    list: [
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'a' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'b' }
    ]
  }

  it('renders without crashing', () => {
    div = document.createElement('div')
    ReactDOM.render(<Table { ...props } />, div)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a valid snapshot', () => {
    component = renderer.create(
      <Table { ...props }/>
    )
    tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('shows two items in the list', () => {
    element = shallow(
      <Table { ...props }/>
    )
    const list = element.find('.table-row')

    expect(list.length).toBe(2)
  })
})
