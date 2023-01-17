import { NavLink } from "react-router-dom"
import { useState, useContext } from 'react'
import Img from '../assets/react.svg';
import { userContext } from "../context/userContext";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false)

  const {user, setUser} = useContext(userContext)
  const logout = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('access_token');
    setUser(null)
  }
  return (
    <nav>
        <div className="header">
            <img src={Img} alt="" />
            <h3 style={{fontFamily: 'Inter'}}>MERN Shop</h3>
        </div>
        <div className={`links${isExpanded? ' active':''}`}>
          <ul>
              { user &&  <li> <NavLink to="/"><span className="material-symbols-outlined">home</span> მთავარი </NavLink> </li>}
              { !user && <li>
                <NavLink to="/login"> <span id="icon" className="material-symbols-outlined">login</span> შესვლა </NavLink>
              </li>}
              { !user && <li> <NavLink to="/register"><span className="material-symbols-outlined">description</span> რეგისტრაცია </NavLink></li> }
              { user && <li> <NavLink to="/cart"> კალათა </NavLink> </li>}
              { user && <li> <NavLink to="/products"> პროდუქტები </NavLink> </li>}
              { user && <li> <NavLink onClick={logout} to="/login"> <span className="material-symbols-outlined">logout</span> გასვლა </NavLink> </li>}
          </ul>
          <span onClick={() => setIsExpanded(prevVal => !prevVal)} id="toggler" className="material-symbols-outlined">menu</span>
        </div>
    </nav>
  )
}

export default Navbar