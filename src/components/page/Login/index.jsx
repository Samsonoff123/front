import { Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import loginimg from '../../../assets/login.png'

export default function Login({setIsAuth}) {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [isError, setIsError] = useState(false)

    const handleLog = () => {
        if (login === '' || password === '' || !login.includes('@') || password.length < 4) {
            setIsError(true)
        } else {
            axios.post('http://localhost:5000/api/user/login', {
                email: login,
                password
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                setIsAuth(true)
            }).catch((e)=> {
                setIsError(true)
            })

        }
    }

    const handleReg =() => {
        if (login === '' || password === '' || !login.includes('@') || password.length < 4) {
            setIsError(true)
        } else {
            axios.post('http://localhost:5000/api/user/reg', {
                email: login,
                password
            }).then((res) => {
                localStorage.setItem('token', res.data.token)
                setIsAuth(true)
            }).catch((e)=> {
                setIsError(true)
            })
        }
    }

  return (
    <div className='login__main'>
        <form className='login__form'>
            <img src={loginimg} alt="loginImg" />
            <TextField type="email" error={isError} onChange={(e)=>{setLogin(e.target.value); setIsError(false)}} label="Login" variant="standard" />
            <TextField type="password" error={isError} onChange={(e)=>{setPassword(e.target.value); setIsError(false)}} label="Password" variant="standard" />
            <div className="buttons">
                <Button onClick={handleLog} variant="contained">Кіру</Button>
                <Button onClick={handleReg} variant="contained">Аккаунт ашу</Button>
            </div>
        </form>
    </div>
  )
}
