import { Rating } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Product from '../../Product';

export default function Main() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    axios.get('http://localhost:5000/api/product/')
      .then((res) => {
        setProducts(res.data.rows)
        setIsLoading(false)
      })
      .catch((e) => {
        console.log(e);
      })
  }, [])

  return (
    <div>
        <Header />
        <div className="main">
            <div className="products">
              {
                !isLoading
                ? <div className='product__main'>
                    {
                      products.length === 0 ? 
                        <>no data</>
                      :
                      products.map((product, index) => 
                        <Product product={product} index={index} />
                      )
                    }
                </div>
                : "loading"
              }
            </div>
        </div>
    </div>
  )
}
