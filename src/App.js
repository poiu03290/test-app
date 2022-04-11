import React, { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import Header from './View/components/Header'
import Router from './Router'

export const userContext = createContext('')

const App = () => {
  // 전역적으로 관리할 useContext
  const [context, setContext] = useState({
    isToken: false,
    token: '',
    url: "https://mycroft-test-api.herokuapp.com/",
    headerType: {"Content-type": "application/json"},
    getToken: (_token) => setContext({...context, 
      isToken: true,
      toke: _token
    })
  })

  return (
    context.isToken ? (
      <userContext.Provider value={context}>
        <BrowserRouter>
          <Header />
          <Router />
        </BrowserRouter>
      </userContext.Provider>
    ) : (
    <userContext.Provider value={context}>
      <BrowserRouter>
        <Header />
        <Router />
      </BrowserRouter>
    </userContext.Provider>
    )
  )
}

export default App