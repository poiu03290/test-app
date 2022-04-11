import React, { useEffect, useState, useContext } from 'react'
import { useParams } from "react-router-dom";
import { userContext } from '../../../../App';

const Item = () => {
    const context = useContext(userContext)
    const params = useParams()
    const [item, setItem] = useState({
        id: 0,
        itemName: ''
    })
    let _id = Number(params.id)

    const getItem = async() => {
        const res = await fetch(context.url + `order/${_id}`, {
            method: "GET",
            headers: context.headerType,
        })
            const json = await res.json()
            setItem({...item, id: json.id, itemName: json.itemName})
        }
    
    useEffect(() => {
        getItem()
    }, [params])
    
    return(
        <div>
            {item.id}. {item.itemName}
        </div>
    )
}

export default Item