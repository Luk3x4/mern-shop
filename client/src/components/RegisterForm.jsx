import { useState, useLayoutEffect } from "react"
import gsap from 'gsap';

const RegisterForm = ({handleSubmit, error}) => {
  const [fields, setFields] = useState({email: '', username: '', password: '', file: ''})

  const handleChange = (e) => {
    setFields(prevValues => {
        return {...prevValues, [e.target.name]: e.target.value}
    })
  }

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.to('.active',{
        height: 'auto',
        duration: '.3',
        ease: 'power2',
        opacity: 1,
      })
    })
    return() => {
      context.revert()
    }
  }, [error])
  
  return (
    <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, fields)}>
        <h1>რეგისტრაცია</h1>
        {error && <div className={`error ${error? 'active': ''}`}> <span style={{transform: 'translateY(5px)'}} className="material-symbols-outlined">warning</span> {error} </div>}
        <input type="text" onChange={handleChange} placeholder="მეილი*" name="email" value={fields.email} />
        <input type="text" onChange={handleChange} placeholder="სახელი*" name="username" value={fields.username} />
        <input type="password" onChange={handleChange} placeholder="პაროლი*" name="password" value={fields.password} />
        <input type="file" style={{border: 0}} onChange={(e) => setFields({...fields, file: e.target.files[0]})} id="" />
        <button type="submit"> რეგისტრაცია </button>
    </form>
  )
}

export default RegisterForm