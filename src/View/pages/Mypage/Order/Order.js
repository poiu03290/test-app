import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route, useParams, useLocation } from "react-router-dom";
import OrderItem from '../../../components/OrderItem'
import PageForm from '../../../components/PageForm'
import Item from '../Item/Item';
import { userContext } from '../../../../App';

const Order = () => {
    const params = useParams()
    const location = useLocation()
    const context = useContext(userContext)
    const [orderLists, setOrderLists] = useState([])
    const [orderItems, setOrderItems] = useState([])
    const [toggle, setToggle] = useState(false)
  
    const getOrderLists = async () => {
      const res = await fetch(context.url + "order", {
        method: "GET",
        headers: context.headerType,
      })
      const json = await res.json()
      setOrderLists(json)
      setOrderItems(json.content)
    }
    
    useEffect(() => {
        getOrderLists()
    }, [])

    let orderItemMapping = []
    for (let i = 0; i < orderItems.length; i++) {
        orderItemMapping.push(
            <OrderItem 
                key={orderItems[i].id} 
                id={orderItems[i].id} 
                itemName={orderItems[i].itemName} 
            />)
    }

    const paramsId = location.pathname.split('/')
    useEffect(() => {
        if (Number(paramsId[paramsId.length - 1])) {
            setToggle(true)
        } else {
            setToggle(false)
        }
    }, [params])

    return (
        !toggle ? (
            <div>
                <h2>주문 목록</h2>
                {orderItemMapping}
                <PageForm 
                    setOrderLists={setOrderLists}
                    orderLists={orderLists}
                    setOrderItems={setOrderItems}
                />
            </div>
        ) : (
            <Routes>
                <Route path=":id" element={<Item />} />
            </Routes> 
        )
    )
}

export default Order