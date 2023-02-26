import React from 'react'
import { useGetProductsQuery } from '../../../redux/slice/productService';
import Header from '../../Header'
import Product from '../../Product';

export default function Main({isAdmin}) {
  const { data, isFetching } = useGetProductsQuery()

  if (isFetching) {
    return (
    <div className="products__main">
      <Header isAdmin={isAdmin} />
      <>loading</>
    </div>)
  }

  return (
    <div className="products__main">
        <Header isAdmin={isAdmin} back={false} />
        <div className="main">
            <div className="products">
              {
                <div className='product__main'>
                    {
                      !data.rows.length ? 
                        <>no data</>
                      :
                      data.rows.map((product) => 
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