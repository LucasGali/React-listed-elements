import React, { useEffect, useState } from 'react'
import Card from '../components/Card/Card'
import { getProducts } from '../services/ProductsApi'
import './Home.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [sortValue, setSortValue] = useState('title')
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

  function sortProducts() {
    const sortedProducts = [...filterProducts].sort((a, b) => {
      if (a[sortValue] > b[sortValue]) {
        return 1
      }
      if (a[sortValue] < b[sortValue]) {
        return -1
      }
      return 0
    })
    setFilterProducts(sortedProducts)
  }

  function invertSort() {
    const invertProducts = [...filterProducts].reverse()
    setFilterProducts(invertProducts)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    setFilterProducts(products)
  }, [products])

  useEffect(() => {
    sortProducts()
  }, [sortValue])

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
              <label className='form-label' htmlFor="search">Search</label>
              <input id='search' className='form-control' type='text' onChange={(e) => seachProducts(e)} ></input>
            </div>
            { filterProducts.length > 0 && 
              <div className='col-3'>
              <button type='button' className='btn__sort' onClick={() => invertSort()}>
                <span>&#8645;</span>
              </button>
              <select className='form-select form-select-lg' onChange={(e) => setSortValue(e.target.value)}>
                <option value='title'>Title</option>
                <option value='price'>Price</option>
              </select>
            </div>}
          </div>
          <div className='row'>
          {filterProducts.length > 0 ? (filterProducts.map((product) => (
            <Card className='col' key={product.id} image={product.image} text={product.title} />
          ))
          ) : (
            <div className='col-12 mt-2'>
              <h1 className='text-center'>No products found</h1>
            </div>
          )}
          </div>
        </div>
      )}
    </>
  )
}

export default Home
