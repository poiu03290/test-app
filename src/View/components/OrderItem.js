import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const OrderItem = (props) => {
    const { id, itemName } = props

    return(
        <div>
            <ul>
                <li className='order-list'>
                    <Link to={`/mypage/order/${id}`}>{id}. {itemName}</Link>
                    {/* <Link to="/mypage/order/item">{id}. {itemName}</Link> */}
                </li>
            </ul>
        </div>
    )
}

export default OrderItem