import React, { useState } from 'react'
import styles from './Login.module.css'
import loginImage from '../../../assets/images/loginBack.png'
import Button from '../../Button';
import { ReactComponent as Facebook } from '../../../assets/icons/facebook.svg'
import { ReactComponent as Twitter } from '../../../assets/icons/twitter.svg'
import { ReactComponent as Google } from '../../../assets/icons/Google.svg'
import { ReactComponent as In } from '../../../assets/icons/in.svg'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'
 
export default function Login({setIsAuth}) {
  const [login, setLogin] = useState(true);

  const handleSubmitLogin = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    if (email !== '' && password !== '') {
      axios.post('https://asem-backend.vercel.app/api/user/login', {
        email, password
      }).then((res) => {
        localStorage.setItem('token', res.data.token)
        setIsAuth(true);
      }).catch((e)=>{
        toast.error(e.response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
      })
    } else {
      toast.error('Ошибка!', {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }

  const handleSubmitReg = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const full_name = formData.get('full_name')
    const email = formData.get('email')
    const password = formData.get('password')

    if (full_name !== '' && email !== '' && password !== '') {
      axios.post('https://asem-backend.vercel.app/api/user/reg', {
        email, password, full_name
      }).then((res) => {
        localStorage.setItem('token', res.data.token)
        setIsAuth(true);
      }).catch((e)=>{
        toast.error(e.response.data.message, {
          position: "top-center",
          autoClose: 1000,
        });
      })
    } else {
      toast.error('Ошибка!', {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }

  return (
    <>
      <ToastContainer />

    <div className={styles.flex}>
    <img src={loginImage} alt="loginImage" />
      <div className={styles.main}>
          <h3>
            <span onClick={()=>!login && setLogin(true)} className={!login && styles.active}>Log In</span> 
            <span className={styles.or}> or </span> 
            <span onClick={()=>login && setLogin(false)} className={login && styles.active}>Sign In</span>
          </h3>

          {
            login ? 
            <form id="testid" onSubmit={(e)=>handleSubmitLogin(e)}>
              <div className={styles.input__group}>
                <label>E-MAIL</label>
                <input name='email' type="email" placeholder='Enter your email addres' />
              </div>
              <div className={styles.input__group}>
                <label>PASSWORD</label>
                <input name='password' type="password" placeholder='**********' />
              </div>
              <div className={styles.button__group}>
                <Button style={{minWidth: '50%'}}>Log In</Button>
                <span className={styles.fogot}>Forgot your password?</span>
              </div>
            </form>
            : 
            <form onSubmit={(e)=>handleSubmitReg(e)}>
            <div className={styles.input__group}>
              <label>E-MAIL</label>
              <input name='email' type="email" placeholder='Enter your email addres' />
            </div>
            <div className={styles.input__group}>
              <label>PASSWORD</label>
              <input name='password' type="password" placeholder='**********' />
            </div>
            <div className={styles.input__group}>
              <label>FULL NAME</label>
              <input name='full_name' type="text" placeholder='Enter your full name' />
            </div>
            <div className={styles.button__group}>
              <Button style={{minWidth: '50%'}}>Sign In</Button>
              <span className={styles.fogot}>Forgot your password?</span>
            </div>
          </form>
          }
          </div>
          <div className={styles.bottom}>
            <span>{!login ? "Sign up" : "Log In"} with social platforms</span>
            <div className={styles.icons}>
              <Facebook />
              <Twitter />
              <Google />
              <In />
            </div>
          </div>
    </div>
    </>
  )
}
