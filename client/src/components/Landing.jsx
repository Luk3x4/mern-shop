import {useContext, useEffect} from 'react'
import { userContext } from '../context/userContext'
import { Link } from 'react-router-dom'

const Landing = () => {
  const { user, setUser } = useContext(userContext)
  return (
    <div className="landing">
        <div className="landing-inner">
            <div className="img">
              { user?.avatar && <img src={`https://node-shop-production.up.railway.app/${user?.avatar}`} alt=""/>}
            </div>
            <h1> სალამი {user?.username} </h1>
            <Link to="/products"> პროდუქტები </Link> 
            <Link to="/cart"> კალათა </Link> 
        </div>
    </div>
  )
}

export default Landing