import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios';
import Loader from '../components/Loader'

const SingleProduct = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [condition, setCondition] = useState('')
  const { id } = useParams()

  const addToCart = async () => {
    try{
        const res = await axios.post('https://node-shop-production.up.railway.app/api/cart', {
            id
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        setCondition('პროდუქტი წარმატებით დაემატა კალათში')
    }catch(e) {
        setCondition(e?.response?.data?.error)
    }

  }

  useEffect(() => {
    const getProduct = async () => {
        const res = await axios.get(`https://node-shop-production.up.railway.app/api/products/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        setProduct(res.data.product)
        setLoading(false)
    }
    getProduct()
  }, [])
  return (
      <div className="singleprod">
        {loading && <Loader />}
        <div className="product-inner">
            <div className="img-cont">
                <img src={product.product_image} alt="" />
            </div>
            <div className="details">
                <h1> {product.product} </h1>
                <h2> Price: {product.product_price} GEL </h2>
            </div>
            <button onClick={addToCart}> კალათაში დამატება </button>
            {condition && <h4 style={{color: condition.includes('წარმატებით')? 'green': 'red'}}> {condition} </h4>}
        </div>
      </div>
  )
}

export default SingleProduct