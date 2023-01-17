import axios from 'axios'
import { useEffect, useState } from 'react';
import Product from '../components/Product'
import Loader from '../components/Loader'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('');
  const getProducts = async () =>{
      setLoading(true)
      const res = await axios.get(`https://node-shop-production.up.railway.app/api/products${query?'?query='+query:''}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
      });
      setProducts(res.data.product);
      setLoading(false)
  }
  useEffect(() => {
    getProducts()
  }, [])
  return (
      <div style={{transform: `translateY(50px)`}} className="products">
        {loading && <Loader /> }
        <div className="search">
            <input value={query} placeholder="ძიება..." onChange={(e) => setQuery(e.target.value)} type="text" />
            <button onClick={getProducts}> ძიება </button>
        </div>
        <div className="prod">
            {products.map(el => {
                return (
                    <Product key={el._id} {...el} />
                )
            })}
        </div>
    </div>
  )
}

export default Products