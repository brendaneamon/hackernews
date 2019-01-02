const BASE_PATH = 'http://hn.algolia.com/api/v1'
const cache = new Map()

const request = async (path, method = 'GET') => {
  let response
  try {
    response = await window.fetch(path, {
      method
    })
    return response
  } catch (error) {
    return Promise.reject(new Error(error))
  }
}

const getSearchResults = async (term, currentPage) => {
  if (cache.has(term) && cache.get(term).page >= currentPage) {
    return Promise.resolve(cache.get(term))
  }

  const response = await request(`${BASE_PATH}/search?query=${term}&page=${currentPage}`)

  const {
    status,
    ok,
    headers
  } = response

  if (!ok || status !== 200) {
    return Promise.reject(new Error(`Response code from Hacker News API: ${status}`))
  }

  const isJSON = headers.get('content-type').includes('application/json')

  if (isJSON) {
    return response.json().then(data => {
      if (cache.has(term)) {
        const { hits: oldHits } = cache.get(term)
        const result = {
          hits: [...oldHits, ...data.hits],
          page: currentPage
        }
        cache.set(term, result)
        return result
      }

      const { hits, page } = data
      cache.set(term, { hits, page })
      return { hits, page }
    })
  }

  return Promise.reject(new Error('Response did not include JSON'))
}


export { cache, getSearchResults }