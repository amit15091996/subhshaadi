import React, { useContext } from 'react'
import { apiContexts } from '../context/ApiContextsData'

const ApiContextHooks = () => {
  return (useContext(apiContexts))
}

export default ApiContextHooks
