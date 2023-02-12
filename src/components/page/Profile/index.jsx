import React, { useState } from 'react'
import Header from '../../Header'
import { ReactComponent as Logout } from '../../../assets/logout.svg'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { toast } from 'react-toastify'

export default function Profile() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [tag, setTag] = useState('')
  const [img, setImg] = useState('')
  const [shortDescription, setShortDescription] = useState('')
  const [description, setDescription] = useState('')
  const [isError, setIsError] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    document.location.reload()
  }

  const handleSubmit = () => {
    if (name === '' || price === 0 || tag === '' || img === '' || shortDescription === '' || description === '') {
      setIsError(true)
    } else {
      axios.post('https://asem-backend.vercel.app/api/product/', {
        name,
        price, 
        tag,
        img,
        shortDescription,
        description,
      }, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).then((res) => {
        console.log(res);
        toast.success('Продукт создан!', {
          position: "top-center",
          autoClose: 1000,
        });
      }).catch((e) => {
        console.log(e);
        toast.error('Ошибка!', {
          position: "top-center",
          autoClose: 1000,
        });
      })
    }
  }

  return (
    <div>
        <Header />
        <div className="profile">
            <h3>Создание поста</h3>
            <div className='profile__creating'>
              <TextField error={isError} value={name} onChange={(e)=>{setName(e.target.value); setIsError(false)}} label="Name" variant="standard" />
              <TextField error={isError} value={price} onChange={(e)=>{setPrice(e.target.value); setIsError(false)}} type="number" label="Price" variant="standard" />
              <TextField error={isError} value={tag} onChange={(e)=>{setTag(e.target.value); setIsError(false)}} label="Tag" variant="standard" />
              <TextField error={isError} value={img} onChange={(e)=>{setImg(e.target.value); setIsError(false)}} label="Image" variant="standard" />
              <TextField error={isError} value={shortDescription} onChange={(e)=>{setShortDescription(e.target.value); setIsError(false)}} multiline rows={3} label="Short Description" variant="standard" />
              <TextField error={isError} value={description} onChange={(e)=>{setDescription(e.target.value); setIsError(false)}} multiline rows={5} label="Description" variant="standard" />
              <Button onClick={handleSubmit} variant="contained">Создать</Button>
            </div>
            <div className='exit'>
              <span>Exit</span>
              <Logout onClick={handleLogout} style={{cursor: 'pointer', width: 50, height: 50, fill: 'black'}} />
            </div>
        </div>
    </div>
  )
}
