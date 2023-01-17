import { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/userContext'
import axios from 'axios';
import gsap from 'gsap'
import Landing from '../components/Landing'

const Home = () => {
  const { user, setUser } = useContext(userContext)
  const navigate = useNavigate()

  useEffect(() => {
    const getData = async () => {
      try{
        const response = await axios.get('https://node-shop-production.up.railway.app/api/users/user-info', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`
          }
        })
      }catch(err){
        if(err.response.data.err == 'Unauthorized' || err.response.data.err == 'Invalid Token'){
          localStorage.removeItem('access_token');
          localStorage.removeItem('user');
          setUser(null)
          navigate('/login')
        }
      }
    }
    if(!user){
      navigate('/login')
    }
    getData()
  }, [])

  return (
    <div className="home" style={{transform: 'translateY(50px)'}}>
        <Landing />
    </div>
  )
}

export default Home