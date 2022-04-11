import React, { useState, useCallback, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../../App'

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i

const Login = () => {
    const navigate = useNavigate()
    const context = useContext(userContext)

    const [profile, setProfile] = useState({
        email: '',
        password: '',
        Repassword: '',
        mobile: ''
    })

    // 이메일만 형식 확인.
    const isCheckVaildEmail = useCallback(() => {
        if (!emailRegex.test(profile.email)) {
            return false
        }

        return true
    }, [profile.email])

    const onLoginButtonClick = useCallback(async(value) => {
        const res = await fetch(context.url + "login", {
            method: "POST",
            headers: context.headerType,
            body: JSON.stringify({
                user: {
                    email: profile.email,
                    password: profile.password
                },
            }),
        })
        const json = await res.json()
        if(!isCheckVaildEmail()) {
            alert('이메일 형식을 확인해주세요.')
            return
        }
        if(json.status === 401) {
            alert('비밀번호는 8자리 이상 입력해주세요.')
            return
        } else {
            context.getToken(json.token)
            navigate('/')
        }
      }, [profile, context, navigate, isCheckVaildEmail])

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
                <button type="submit" onClick={onLoginButtonClick}>로그인</button>
            </form>
        </div>
    )
}

export default Login