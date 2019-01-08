import { sortBy } from 'lodash'

const SORTS = {
  NONE(list) {
    return list
  },
  TITLE(list) {
    return sortBy(list, 'title')
  },
  AUTHOR(list) {
    return sortBy(list, 'author')
  },
  COMMENTS(list) {
    return sortBy(list, 'num_comments').reverse()
  },
  POINTS(list) {
    return sortBy(list, 'points').reverse()
  }
}

export { SORTS }
