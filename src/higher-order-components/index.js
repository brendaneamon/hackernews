import React from 'react'
import { Loading, Button } from '../components'

const withLoading = (Component) =>
  ({ loading, ...rest }) =>
    loading
    ? <Loading />
    : <Component { ...rest} />

const ButtonWithLoading = withLoading(Button)

export { ButtonWithLoading }
