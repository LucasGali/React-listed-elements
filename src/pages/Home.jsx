import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { getProducts } from '../services/ProductsApi'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [filterProducts, setFilterProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    const response = await getProducts()
    setProducts(response)
    setLoading(false)
  }

  function seachProducts({ target }) {
    const { value } = target
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(value.toLowerCase())
    })
    setFilterProducts(filteredProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  return (
    <>
      {loading ? (
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div className='container'>
          <div className="row">
            <div className="col-9">
              <label className='form-label' htmlFor="search">Products</label>
              <input id='search' className='form-control' type='text' onChange={(e) => seachProducts(e)} ></input>
            </div>
            <div>
              
            </div>
          </div>
          <div className='row'>
          {filterProducts.map((product) => (
            <Card className='col' key={product.id} image={product.image} text={product.title} />
          ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
