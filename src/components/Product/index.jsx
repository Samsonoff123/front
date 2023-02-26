import { Rating } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as Cart } from '../../assets/cart.svg'
import { ReactComponent as Like } from '../../assets/like.svg'
import { useActions } from '../../hooks/useActions';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '../../components/Button'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";

export default function Product({product}) {
    const { addToCart, removeCart, addToLike, removeLike } = useActions()
    const [open, setOpen] = useState();

    const { cart, like } = useSelector(state => state)

    const isExistInCart = cart.some(p => p.id === product.id)
    const isExistInLike = like.some(p => p.id === product.id)

    const handleCart = () => {
      if (!isExistInCart) {
        addToCart(product)
      } else {
        removeCart(product)
      }
    }

    const handleLike = () => {
      if (!isExistInLike) {
        addToLike(product)
      } else {
        removeLike(product)
      }
    }

    const handleRemove = (id) => {
      axios.delete(`https://asem-backend.vercel.app/api/product/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }).then(() => {
        document.location.reload()
      }).catch(() => {
        toast.error("Продукт не удален!", {
          position: "top-center",
          autoClose: 1000,
        });
      })
      setOpen(false)
    }

  return (
    <div className='product__element' key={product.id}>
        <DeleteOutlineIcon className='removeButton' onClick={()=>setOpen(true)} />
        <img src={product.img} alt="productImg" />
        <span className='price'>{product.price} KZT</span>
        <div className='product__info'>
            <div className="product__title">{product.name}</div>
            <div className="product__description">{product.shortDescription.text}</div>
            <Rating style={{marginTop: 'auto'}} name="read-only" value={product.raiting} readOnly />
            <div className='icons'>
                <Cart className={isExistInCart && 'cart__active'} onClick={handleCart} />
                <Like className={isExistInLike && 'cart__active'} onClick={handleLike} />
            </div>
        </div>
        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Remove modal"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete "{product.name}"
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button white onClick={()=>setOpen(false)}>Disagree</Button>
            <Button onClick={()=>handleRemove(product.id)} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
        <ToastContainer />
    </div>
  )
}
