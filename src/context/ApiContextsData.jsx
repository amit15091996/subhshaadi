import React, { createContext } from 'react'

export const apiContexts=createContext({})



const ApiContextsData = ({children ,value}) => {
  return (
   <apiContexts.Provider value={value}>
    {children}
   </apiContexts.Provider>
  )
}

export default ApiContextsData;
