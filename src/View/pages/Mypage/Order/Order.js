import React, { useEffect } from 'react'
import OrderItem from '../../../components/OrderItem'
import Page from '../../../components/Page'

const Order = (props) => {
    
    const { orderLists, orderItems, setOrderItems, setOrderLists, getOrderLists, getItem } = props
    useEffect(() => {
        getOrderLists()
    }, [])

    const orderItemsMapping = orderItems.map((item, index) =>
        <OrderItem 
            key={index}
            id={item.id}
            itemName={item.itemName} 
            getItem={getItem}
    />) 

    return (
        <div>
            <h2>주문 목록</h2>
            {orderItemsMapping}
            <Page 
                setOrderLists={setOrderLists}
                orderLists={orderLists}
                setOrderItems={setOrderItems}
            />
        </div>
    )
}

export default Order