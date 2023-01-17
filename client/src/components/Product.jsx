import { Link } from 'react-router-dom'

const Product = (props) => {
  return (
    <div className="product">
        {props?.product_image && <img src={props.product_image} />}
        <h1>{props.product}</h1>
        <h2>{props.product_price}</h2>
        <Link to={`/products/${props._id}`}> სრულად </Link>
        {props?.delete && <button onClick={() => props.deleteCartItem(props._id)}> x </button>}
    </div>
  )
}

export default Product