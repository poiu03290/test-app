import React from 'react'
import PageButton from './PageButton';

const Page = (props) => {
    const { setOrderLists, orderLists, setOrderItems } = props

    const onPageButtonClick = async (event) => {
        let value = event.target.value
        const res = await fetch(`https://mycroft-test-api.herokuapp.com/order?page=${value}`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        })
        const json = await res.json()
        setOrderLists(json)
        setOrderItems(json.content)
    }

    const pageButtonMapping = [...Array(orderLists.totalPages).keys()].map((index) => 
        <PageButton 
            key={index}
            value={index+1}
            orderLists={orderLists}
            onPageButtonClick={onPageButtonClick}
        />)

    return(
        <div className='container'>
            <ul>
                <li className='flex-center flex-row'>
                    {pageButtonMapping}
                </li>
            </ul>
        </div>
    )
}

export default Page