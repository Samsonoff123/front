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
      axios.post('https://umka-diplom-samsonoff123.vercel.app/api/user/login', {
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
    const email = formData.get('email')
    const password = formData.get('password')
    const first_name = formData.get('first_name')
    const last_name = formData.get('last_name')
    const birthday = formData.get('birthday')
    const sex = formData.get('sex')

    if (first_name !== '' && email !== '' && password !== '' && last_name !== '' && birthday !== '' && sex !== '') {
      axios.post('https://umka-diplom-samsonoff123.vercel.app/api/user/reg', {
        email, password, first_name, last_name, birthday, sex
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
    <div style={{background: 'linear-gradient(342deg, rgba(72,63,152,1) 0%, rgba(105,173,209,1) 100%)'}}>
      <ToastContainer />

    <div className={styles.flex}>
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
                <input name='email' type="text" placeholder='Enter your email addres' />
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
              <label>FIRST NAME</label>
              <input name='first_name' type="text" placeholder='Enter your first name' />
            </div>
            <div className={styles.input__group}>
              <label>LAST NAME</label>
              <input name='last_name' type="text" placeholder='Enter your last name' />
            </div>
            <div className={styles.input__group}>
              <label>BIRTHDAY</label>
              <input name='birthday' type="date" />
            </div>
            <div className={styles.input__group}>
              <label>SEX</label>
              <select name='sex'>
                <option value="men">MEN</option>
                <option value="men">WOMAN</option>
              </select>
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
    </div>
  )
}
