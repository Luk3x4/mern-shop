import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Products from './pages/Products';
import Cart from './pages/Cart'
import { userContext } from './context/userContext';
import SingleProduct from './pages/SingleProduct';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

  return (
    <BrowserRouter>
      <userContext.Provider value={{user, setUser}}>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  )
}

export default App
