import { sortBy } from 'lodash'

const SORTS = {
  NONE(list) {
    return list
  },
  TITLE(list, reverse = false) {
    return reverse
      ? sortBy(list, 'title').reverse()
      : sortBy(list, 'title')
  },
  AUTHOR(list, reverse = false) {
    return reverse
      ? sortBy(list, 'author').reverse()
      : sortBy(list, 'author')
  },
  COMMENTS(list, reverse = false) {
    return reverse
      ? sortBy(list, 'num_comments')
      : sortBy(list, 'num_comments').reverse()
  },
  POINTS(list, reverse = false) {
    return reverse
      ? sortBy(list, 'points')
      : sortBy(list, 'points').reverse()
  }
}

export { SORTS }
