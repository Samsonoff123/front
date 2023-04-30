import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Header'
import Product from '../../Product'
import Button from '../../Button'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import axios from 'axios'
import { parseJwt } from '../../../App'
import { toast, ToastContainer } from "react-toastify";


export default function Cart({isAdmin}) {
  const { cart } = useSelector(state => state)
  const [open, setOpen] = useState();

  const handlSubmit = () => {
    const userId = parseJwt(localStorage.getItem('token')).id
    const productIds = cart.map(e => e.id)

    axios.post('https://umka-diplom-samsonoff123.vercel.app/api/order', {
      userId,
      productIds
    })
    .then(() => {
      toast.success("Заказ создан, скоро с вами свяжется наш менеджер!", {
        position: "top-center",
        autoClose: 1000,
      });
      setOpen(false)
    })
  }

  return (
    <>
    <div className='cart__page'>
        <Header isAdmin={isAdmin} pageName="Cart page" />
        <div className="main">
            <div className="products">
              {
                cart
                ?
                <div className="product__main">
                    {
                      cart.length !== 0 
                      ?
                        cart.map((product) =>
                          <Product product={product} />
                        )
                      : <>no data</>
                    }
                </div>
                : <>loading</>
              }
            </div>
            {
              cart.length !== 0 && <Button style={{width: 'calc(100% - 10px)', position: 'absolute', bottom: 55, border: '1px solid #000'}} onClick={()=>setOpen(true)}>Order</Button>
            }
        </div>
        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Confirmation modal"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to buy these products?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button style={{minWidth:'auto'}} white onClick={()=>setOpen(false)}>Disagree</Button>
            <Button style={{minWidth:'auto'}} onClick={handlSubmit}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
    </div>
      <ToastContainer/>
    </>
  )
}
