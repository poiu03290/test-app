import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import Order from './View/pages/Mypage/Order/Order';
import Logout from './View/pages/Logout/Logout';
import Home from './View/pages/Home/Home'
import SignUp from './View/pages/SignUp/SignUp';
import Login from './View/pages/Login/Login'
import { userContext } from './App'


const Router = () => {
    const context = useContext(userContext)
    return context.isToken ? (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mypage/order/*" element={<Order />} />
            <Route path="/logout" element={<Logout />} />
        </Routes>
    ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default Router