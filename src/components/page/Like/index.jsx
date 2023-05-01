import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../../Header'
import Product from '../../Product'
import { NoData } from '../../NoData'
import { Loading } from '../../Loading'

export default function Like({isAdmin}) {
  const { like } = useSelector(state => state)
  return (
    <div className='like__page'>
        <Header isAdmin={isAdmin} pageName="Like page" />
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
                      : <NoData/>
                    }
                </div>
                : <Loading/>
              }
            </div>
        </div>
    </div>
  )
}
