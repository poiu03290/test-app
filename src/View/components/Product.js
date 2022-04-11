import React, { useContext } from 'react'
import logo from '../../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App'

const Product = () => {
    const navigate = useNavigate()
    const isToken = useContext(userContext)
    const onOrderButtonClick = () => {
        if (!isToken) {
            alert("주문 전 로그인을 해야합니다. 로그인 화면으로 넘어갑니다.")
            navigate('./login')
            return
        }
        alert("주문이 완료되었습니다.")
    }

    return(
        <div className='cont-service'>
            <div className='cont-order'>
                <img src={logo} alt="서비스 이미지"/>
                <button onClick={onOrderButtonClick}>주문하기</button>
            </div>
        </div>
    )
}

export default Product