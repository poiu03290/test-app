import React, { useState, useCallback, useRef, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { userContext } from '../../../App'

const emailRegex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}/i

const SignUp = () => {
    const refEmail = useRef(null)
    const refPassword = useRef(null)
    const navigate = useNavigate()
    const context = useContext(userContext)

    const [profile, setProfile] = useState({
        email: '',
        password: '',
        Repassword: '',
        mobile: ''
    })
    
    // focus가 넘어갈 때, 이메일 유효성 검증
    const CheckEmailRegex = useCallback((value) => {
        if (!emailRegex.test(value)) {
            refEmail.current.style.border = 'red solid 1px'
            return false
        } 

        refEmail.current.style.border = 'black solid 1px'
    }, [])

    // 사용자가 입력할 때, 비밀번호 유효성 검증
    const CheckLength = useCallback(() => {
        if (profile.password && 
            profile.password.length <= 6) {
            refPassword.current.style.border = 'red solid 1px'
            return
        } 

        refPassword.current.style.border = 'black solid 1px'
        return 
    }, [profile.password])

    // 버튼 클릭시 이메일 유효성 검증
    const isCheckVaildEmail = useCallback(() => {
        if (!emailRegex.test(profile.email)) {
            alert('이메일 형식을 확인해주세요.')
            refEmail.current.focus()
            return false
        }

        return true
    }, [profile.email])

    // 버튼 클릭시 비밀번호 유효성 검증
    const isCheckValidPassword = useCallback(() => {
        if (profile.password && 
            profile.password.length <= 7) {
            alert('비밀번호를 확인해주세요.')
            return false
        } 

        return true
    }, [profile.password])

    // 버튼 클릭시 비밀번호 재확인 유효성 검증
    const isCheckValidRePassword = useCallback(() => {
        if (profile.Repassword &&
            profile.Repassword.length > 0 && 
            profile.password === profile.Repassword) {
            return true
        } else {
            alert('비밀번호가 일치하지 않습니다.')
            return false
        }
    }, [profile.password, profile.Repassword])

    // 연락처 input에 숫자만 입력토록.
    const isCheckNumber = useCallback((event) => {
        if(!Number(event.target.value)) {
            event.target.value = event.target.value.slice(0, event.target.value.length-1)
        }
    }, [])

    const onJoinButtonClick = useCallback(async() => {
        const res = await fetch(context.url + "sign-up", {
            method: "POST",
            headers: context.headerType,
            body: JSON.stringify({
                user: {
                    email: profile.email,
                    password: profile.password,
                    mobile: profile.mobile
                },
            }),
        })
        const json = await res.json()
        if(isCheckVaildEmail() && isCheckValidPassword() && isCheckValidRePassword()) {
            context.getToken(json.token)
            navigate("/")
        } else {
            return
        }
      }, [profile, context, isCheckVaildEmail, isCheckValidPassword, isCheckValidRePassword, navigate])

    return(
        <div className='container flex-center'>
            <h2>회원가입</h2>
            <form className='cont-auth flex-center' onSubmit={(event) => event.preventDefault()}>
                <label htmlFor='auth-email'>이메일</label>
                <input 
                    id='auth-email'
                    type="text"
                    placeholder='이메일 작성'
                    ref={refEmail}
                    onChange={(event) => 
                        setProfile({...profile, email: event.target.value})
                    } 
                    onBlur={(event) => CheckEmailRegex(event.target.value)}
                />
                <label htmlFor='auth-pw'>비밀번호</label>
                <input 
                    id='auth-pw'
                    type="password" 
                    placeholder='비밀번호 입력(8~15자)' 
                    ref={refPassword}
                    maxLength="15"
                    onChange={(event) => {
                        setProfile({...profile, password: event.target.value})
                        CheckLength()
                    }} 
                />
                <label htmlFor='auth-repw'>비밀번호 확인</label>
                <input 
                    id='auth-repw'
                    type="password" 
                    placeholder='비밀번호 재확인' 
                    maxLength="15"
                    onChange={(event) => {
                        setProfile({...profile, Repassword: event.target.value})
                    }}
                />
                <label htmlFor='auth-mobile'>연락처</label>
                <input 
                    id='auth-mobile'
                    type="text" 
                    placeholder='연락처 작성' 
                    maxLength="11" 
                    onChange={isCheckNumber}
                />
                <button tpye="submit" onClick={onJoinButtonClick}>가입하기</button>
            </form>
        </div>
    )
}

export default SignUp