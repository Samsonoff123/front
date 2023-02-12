import { Rating } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { ReactComponent as Cart } from '../../assets/cart.svg'
import { ReactComponent as Like } from '../../assets/like.svg'
import { useActions } from '../../hooks/useActions';

export default function Product({product}) {
    const { addToCart, removeCart, addToLike, removeLike } = useActions()

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

  return (
    <div className='product__element' key={product.id}>
        <img src={product.img} alt="productImg" />
        <span className='price'>{product.price} KZT</span>
        <div className='product__info'>
            <div className="product__title">{product.name}</div>
            <div className="product__description">{product.shortDescription}</div>
            <Rating style={{marginTop: 'auto'}} name="read-only" value={product.raiting} readOnly />
            <div className='icons'>
                <Cart className={isExistInCart && 'cart__active'} onClick={handleCart} />
                <Like className={isExistInLike && 'cart__active'} onClick={handleLike} />
            </div>
        </div>
    </div>
  )
}
