import React, { useCallback, useContext } from 'react'
import { userContext } from '../../App';
import PageButton from './PageButton';

const PageForm = (props) => {
    const { setOrderLists, orderLists, setOrderItems } = props
    const context = useContext(userContext)

    const onPageButtonClick = useCallback(async(event) => {
        let value = event.target.value
        const res = await fetch(context.url + `order?page=${value}`, {
          method: "GET",
          headers: context.headerType,
        })
        const json = await res.json()
        setOrderLists(json)
        setOrderItems(json.content)
    }, [context, setOrderLists, setOrderItems])

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

export default PageForm