import React, { useCallback, useContext } from 'react'
import logo from '../../assets/img/logo.png'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../../App'

const Product = () => {
    const navigate = useNavigate()
    const context = useContext(userContext)
    const onOrderButtonClick = useCallback(() => {
        if (!context.isToken) {
            alert("주문 전 회원가입을 해야합니다. 회원가입 화면으로 넘어갑니다.")
            navigate('./sign-up')
            return
        }
        alert("주문이 완료되었습니다.")
    }, [context, navigate])

    return(
        <div className='cont-service'>
            <div className='cont-order'>
                <img src={logo} loading="lazy" alt="서비스 이미지"/>
                <button onClick={onOrderButtonClick}>주문하기</button>
            </div>
        </div>
    )
}

export default Product