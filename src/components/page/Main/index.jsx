import React from 'react'
import { useGetProductsQuery } from '../../../redux/slice/productService';
import Header from '../../Header'
import Product from '../../Product';
import Button from '../../Button';
import image from '../../../assets/marketology.png'
import { NoData } from '../../NoData';
import { Loading } from '../../Loading';

export default function Main({isAdmin}) {
  const { data, isFetching } = useGetProductsQuery()

  if (isFetching) {
    return (
    <div className="products__main">
      <Header isAdmin={isAdmin} />
      <Loading/>
    </div>)
  }

  return (
    <div className="products__main">
        <Header isAdmin={isAdmin} back={false} />
        <div className="main">
            <div className="products">
              <div className="products__head">
                <div className='products__head_group'>
                  <h3>welcome to shop</h3>
                  <img src={image} />
                </div>

                <span>Did not you find what you were looking for?</span>
                <div className='products__head_buttons'>
                  <Button><a style={{color: '#fff'}} href="tel:+77009674240">Contact us</a></Button>
                  <Button white><a href="mailto:koshmakhan.um@mail.ru">Send email</a></Button>
                </div>
              </div>
              {
                <div className='product__main'>
                    {
                      !data?.rows.length ? 
                        <NoData/>
                      :
                      data?.rows.map((product) => 
                        <Product product={product} />
                      )
                    }
                </div>
              }
            </div>
        </div>
    </div>
  )
}