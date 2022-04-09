import React, { useState, useCallback } from 'react'
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const { getToken } = props
    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        email: '',
        password: '',
        Repassword: '',
        mobile: ''
    })

    const onLoginButtonClick = useCallback(async() => {
        const res = await fetch("https://mycroft-test-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user: {
                    email: profile.email,
                    password: profile.password
                },
            }),
        })
        const json = await res.json()
        if(json.status === 401) {
            alert('비밀번호는 8자리 이상 입력해주세요.')
        } else {
            getToken(json.token)
            navigate('/')
        }
      }, [profile, getToken, navigate])

    return (
        <div className='container flex-center'>
            <h2>로그인</h2>
            <form className='cont-login flex-center' onSubmit={(event) => event.preventDefault()}>
                <label htmlFor='login-email'>이메일</label>
                <input 
                    id='login-email' 
                    type="text" 
                    placeholder='이메일 작성'
                    onChange={(event) => setProfile({...profile, email: event.target.value})}    
                />
                <label htmlFor='login-pw'>비밀번호</label>
                <input 
                    id='login-pw' 
                    type="password" 
                    placeholder='비밀번호 입력(8~15자)'
                    onChange={(event) => setProfile({...profile, password: event.target.value})}    
                />
                <button tpye="submit" onClick={onLoginButtonClick}>로그인</button>
            </form>
        </div>
    )
}

export default Login