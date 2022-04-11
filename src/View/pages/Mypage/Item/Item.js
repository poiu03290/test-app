import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";

const Item = () => {
    const params = useParams()
    const [item, setItem] = useState({
        id: 0,
        itemName: ''
    })
    let id = Number(params.id)

    const getItem = async() => {
        const res = await fetch(`https://mycroft-test-api.herokuapp.com/order/${id}`, {
            method: "GET",
            headers: {
                "Content-type": "application/json",
              },
            })
            const json = await res.json()
            console.log(json)
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