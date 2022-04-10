import React from 'react'
import styled from "styled-components";

const Pagebtn = styled.button`
    margin: 4px;
    cursor: pointer;
    color: ${(props) => props.current ? "red" : "black"}
`

const PageButton = (props) => {
    const { orderLists, onPageButtonClick, value } = props
    
    return(
        <div>
            <Pagebtn 
                value={value-1}
                current={orderLists.currentPage + 1 === value}
                onClick={(event) => onPageButtonClick(event)}
            >
                {value}
            </Pagebtn>
        </div>
    )
}

export default PageButton