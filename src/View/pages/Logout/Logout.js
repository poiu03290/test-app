import React, { useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../../App'

const Logout = () => {
    const context = useContext(userContext)
    const navigate = useNavigate()
    const onLogoutButtonClick = useCallback(() => {
        if (window.confirm("정말 로그아웃을 하시겠습니까?")) {
            context.removeToken()
            navigate('/')
          }
    }, [])
    
    return(
        <div className='containter'>
            <div className='flex-center cont-logout'>
                <button onClick={onLogoutButtonClick}>로그아웃</button>
            </div>
        </div>
    )
}

export default Logout