import {useState, useContext} from 'react'
import RegisterForm from '../components/RegisterForm'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader'
import { userContext } from '../context/userContext';
import { useEffect } from 'react';

const Register = (props) => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const {user, setUser} = useContext(userContext)

  useEffect(() => {
    if(user){
      navigate('/')
    }
  }, [])

  const handleSubmit = async (e, user) => {
    e.preventDefault()
    if(!user.username || !user.password || !user.email){
      return setError('შეავსეთ ყველა ველი!')
    }
    if(user.username.length < 6){
      return setError('სახელი უნდა შედგებოდეს მინიმუმ 6 ასოსგან')
    }else if(user.username.length > 16){
      return setError('სახელის ასოების რაოდენობა არ უნდა აღემატებოდეს 16-ს')
    }
    if(!/\d/.test(user.password)){
      return setError('პაროლი უნდა შეიცავდეს ციფრებს!')
    }
    if(user.password.length > 14 || user.password.length < 6){
      return setError('პაროლის ასოების რაოდენობა არ უნდა აღემატებოდეს 14-ს და არ უნდა იყოს ნაკლები 6-ზე')
    }
    const formData = new FormData()
    formData.append('email', user.email)
    formData.append('username', user.username)
    formData.append('password', user.password)
    user.file ? formData.append('avatar', user.file): null
    try{
        setLoading(true)
        const response = await axios.post('https://node-shop-production.up.railway.app/api/users/register', formData)
        setLoading(false)
        localStorage.setItem('access_token', response.data?.accessToken);
        localStorage.setItem('user', JSON.stringify(response.data?.user))
        setUser(JSON.parse(localStorage.getItem('user')))
        if(localStorage.getItem('access_token')){
          navigate('/')
        }
    }catch(err){
        setLoading(false)
        setError(err.response.data?.err)
    }
  }

  return (
    <div className="register">
        {loading ? <Loader /> :
          <RegisterForm error={error} handleSubmit={handleSubmit}/>
        }
    </div>
  )
}

export default Register