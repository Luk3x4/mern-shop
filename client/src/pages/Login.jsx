import { useState, useContext, useEffect } from 'react'
import LoginForm from '../components/LoginForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import {userContext} from '../context/userContext'


const Login = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { user, setUser } = useContext(userContext)
  
  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e, user) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('email', user.email);
    formData.append('password', user.password);
    try{
      setLoading(true)
      const response = await axios.post('https://node-shop-production.up.railway.app/api/users/login', formData)
      setLoading(false)
      localStorage.setItem('access_token', response.data?.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data?.user));
      setUser(JSON.parse(localStorage.getItem('user')))
      if(localStorage.getItem('access_token')){
        navigate('/')
      }
    }catch(e){
      setLoading(false)
      setError(e.response.data?.err)
    }
  }
  return (
    <div className="login">
      {loading? <Loader />:
        <LoginForm error={error} handleSubmit={handleSubmit} />
      }
    </div>
  )
}

export default Login