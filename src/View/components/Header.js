import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import { userContext } from '../../App'

const Header = () => {
    const context = useContext(userContext)
    return (
        context.isToken ? (
            <>
                <header className='Header flex-center background'>
                    <div className='cont-logo'>
                        <img src={logo} alt={"서비스 로고 이미지"} className="img-logo" />
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={'/'}>서비스</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/mypage/order'}>마이페이지</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/logout'}>로그아웃</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </>
        ) : (
            <>
                <header className='Header flex-center background'>
                    <div className='cont-logo'>
                        <img src={logo} alt={"서비스 로고 이미지"} className="img-logo" />
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <NavLink to={'/'}>서비스</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/sign-up'}>회원가입</NavLink>
                            </li>
                            <li>
                                <NavLink to={'/login'}>로그인</NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
            </>
        )  
    )
}

export default Header