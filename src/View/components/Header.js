import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/img/logo.png'
import styled from "styled-components";
import { userContext } from '../../App'

const NavLists = styled.ul`
    display: flex;
    flex-direction: row;
`

const NavList = styled.li`
    list-style: none;
    cursor: pointer;
    margin-right: 16px;
`

const NavLink = styled(Link)`
    color: ${(props) => props.$current ? "blue" : "black"};
    text-decoration: none;
`

const Header = () => {
    const { pathname } = useLocation()
    const context = useContext(userContext)
    return (
        context.isToken ? (
            <>
                <header className='Header flex-center background'>
                    <div className='cont-logo'>
                        <img src={logo} alt={"서비스 로고 이미지"} className="img-logo" />
                    </div>
                    <nav>
                        <NavLists>
                            <NavList>
                                <NavLink $current={pathname === "/"} to="/" >서비스</NavLink>
                            </NavList>
                            <NavList>
                                <NavLink $current={pathname === "/mypage/order"} to="/mypage/order">마이페이지</NavLink>
                            </NavList>
                            <NavList>
                                <NavLink $current={pathname === "/logout"} to="/logout">로그아웃</NavLink>
                            </NavList>
                        </NavLists>
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
                        <NavLists>
                            <NavList>
                                <NavLink $current={pathname === "/" ? true : false} to="/" >서비스</NavLink>
                            </NavList>
                            <NavList>
                                <NavLink $current={pathname === "/sign-up" ? true : false} to="/sign-up">회원가입</NavLink>
                            </NavList>
                            <NavList>
                                <NavLink $current={pathname === "/login" ? true : false} to="/login">로그인</NavLink>
                            </NavList>
                        </NavLists>
                    </nav>
                </header>
            </>
        )  
    )
}

export default Header