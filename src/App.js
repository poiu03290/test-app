import React, { createContext, useState, useCallback } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './View/pages/Home/Home'
import Header from './View/components/Header'
import SignUp from './View/pages/SignUp/SignUp';
import Login from './View/pages/Login/Login'
import Order from './View/pages/Mypage/Order/Order';
import Logout from './View/pages/Logout/Logout';
import Item from './View/pages/Mypage/Item/Item';

export const userContext = createContext('')

const App = () => {
  const [context, setContext] = useState({
    isToken: false,
    token: '',
  })
  const [orderLists, setOrderLists] = useState([])
  const [orderItems, setOrderItems] = useState([])
  const getOrderLists = async () => {
    const res = await fetch("https://mycroft-test-api.herokuapp.com/order", {
    method: "GET",
    headers: {
        "Content-type": "application/json",
    },
    })
    const json = await res.json()
    setOrderLists(json)
    setOrderItems(json.content)
  }

  const getItem = useCallback(async() => {
    const res = await fetch(`https://mycroft-test-api.herokuapp.com/order/${orderItems.id}`, {
    method: "GET",
    headers: {
        "Content-type": "application/json",
    },
    })
    const json = await res.json()
    console.log(json)
  }, [])

  const getToken = useCallback((_token) => {
    setContext({...context, 
      isToken: true,
      toke: _token
    })
  }, [context])

  return (
    context.isToken ? (
      <userContext.Provider value={context}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage/order/*" element={
              <Order 
                orderLists={orderLists}
                orderItems={orderItems}
                setOrderItems={setOrderItems}
                setOrderLists={setOrderLists}
                getOrderLists={getOrderLists}
                getItem={getItem}
              />
              }> 
              {/* <Route path={`${orderLists.id}`} element={< Item/>} />  */}
            </Route>
            <Route path={`/mypage/order/${orderLists.id}`} element={< Item/>} />
            {/* <Route path={`/mypage/order/item`} element={< Item/>} /> */}
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
      </userContext.Provider>
    ) : (
    <userContext.Provider value={context}>
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