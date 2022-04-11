import React from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

const OrderItem = (props) => {
    const { id, itemName } = props

    return(
        <div>
            <ul>
                <li className='order-list'>
                    <Link to={`/mypage/order/${id}`} className="list-link">{id}. {itemName}</Link>
                </li>
            </ul>
        </div>
    )
}

export default OrderItem