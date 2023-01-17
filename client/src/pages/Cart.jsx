import { useEffect, useState} from 'react'
import axios from 'axios'
import Loader from '../components/Loader'
import Product from '../components/Product';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(true)

  const deleteCartItem = async (id) => {
    setLoading(true)
    const res = await axios.delete(`https://node-shop-production.up.railway.app/api/cart/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    setCart(res.data.user?.cart)
    const total = res.data.user.cart.reduce((a, b) => a + b.product_price, 0);
    setTotalPrice(total)
    setQuantity(res.data.user.cart.length)
    setLoading(false)
  }

  useEffect(() => {
    const getCartData = async () => {
      try {
        const res = await axios.get('https://node-shop-production.up.railway.app/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setCart(res.data.cart.cart)
        const total = res.data.cart.cart.reduce((a, b) => a + b.product_price, 0);
        setTotalPrice(total)
        setQuantity(res.data.cart.cart.length)
        setLoading(false)
      } catch (error) {
        console.log(error)
      }
    }
    
    getCartData()
  }, [])
  return (
    <div className='cart'>
      {loading && <Loader />}
      <div className="grid">
        <div className="items">
          {cart.map(item => {
            return ( 
              <Product deleteCartItem={deleteCartItem} key={item._id} delete="true" {...item} />
            )
          })}
        </div>
        <div className="info">
          <h1> Total Price: {totalPrice} GEL</h1>
          <h3> Item Quantity: {quantity}</h3>
        </div>
      </div>
    </div>
  )
}

export default Cart