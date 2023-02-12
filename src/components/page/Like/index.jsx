import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Header'
import Product from '../../Product'

export default function Like() {
  const { like } = useSelector(state => state)
  return (
    <div className='like__page'>
        <Header pageName="Like page" />
        <div className="main">
            <div className="products">
              {
                like
                ?
                <div className="product__main">
                    {
                      like.length !== 0 
                      ?
                        like.map((product) =>
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
