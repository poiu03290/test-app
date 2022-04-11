import React, { useState, useEffect, useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import OrderItem from '../../../components/OrderItem'
import PageForm from '../../../components/PageForm'
import Item from '../Item/Item';
import { userContext } from '../../../../App';

const Order = () => {
    const context = useContext(userContext)
    const [orderLists, setOrderLists] = useState([])
    const [orderItems, setOrderItems] = useState([])
  
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

    let lis = []
    for (let i = 0; i < orderItems.length; i++) {
        lis.push(<OrderItem key={orderItems[i].id} id={orderItems[i].id} itemName={orderItems[i].itemName} />)
    }

    return (
        <div>
            <h2>주문 목록</h2>
            {lis}
            <PageForm 
                setOrderLists={setOrderLists}
                orderLists={orderLists}
                setOrderItems={setOrderItems}
            />
            <Routes>
                <Route path=":id" element={<Item />} />
            </Routes>
        </div>
    )
}

export default Order