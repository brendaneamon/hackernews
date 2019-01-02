import axios from 'axios'

const BASE_PATH = 'http://hn.algolia.com/api/v1'
const cache = new Map()

const getSearchResults = async (term, currentPage) => {
  if (cache.has(term) && cache.get(term).page >= currentPage) {
    return Promise.resolve(cache.get(term))
  }

  const searchEndpoint = `${BASE_PATH}/search?query=${term}&page=${currentPage}`
  const response = await axios.get(searchEndpoint)

  const {
    data,
    status
  } = response

  if (status !== 200 || (data && !Array.isArray(data.hits))) {
    return Promise.reject(new Error(`Response code from Hacker News API: ${status}`))
  }

  let result
  if (cache.has(term)) {
    result = {
      hits: [...cache.get(term).hits, ...data.hits],
      page: currentPage
    }
    cache.set(term, result)
    return result
  }

  const { hits, page } = data
  result = { hits, page }
  cache.set(term, result)
  return result
}


export { cache, getSearchResults }