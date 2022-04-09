import React, { createContext, useState, useCallback } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './View/pages/Home/Home'
import Header from './View/components/Header'
import SignUp from './View/pages/SignUp/SignUp';
import Login from './View/pages/Login/Login'
import Order from './View/pages/Mypage/Order/Order';
import Logout from './View/pages/Logout/Logout';

export const userContext = createContext('')

const App = () => {
  const [token, setToken] = useState('')
  const [isToken, setIsToken] = useState(false)

  const getToken = useCallback((_token) => {
    setToken(_token)
    setIsToken(true)
  }, [])

  return (
    isToken ? (
      <userContext.Provider value={isToken}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
              <Route path="/mypage/order" element={<Order />} />
              <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    ) : (
    <userContext.Provider value={isToken}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp getToken={getToken} />} />
            <Route path="/login" element={<Login getToken={getToken} />} />
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
    )
  )
}

export default App