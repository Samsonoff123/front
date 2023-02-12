import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Header'
import Product from '../../Product'

export default function Cart() {
  const { cart } = useSelector(state => state)
  return (
    <div className='cart__page'>
        <Header pageName="Cart page" />
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
        </div>
    </div>
  )
}
