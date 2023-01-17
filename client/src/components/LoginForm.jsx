import { useState, useLayoutEffect } from 'react'
import gsap from 'gsap'

const LoginForm = ({error, handleSubmit}) => {
  const [fields, setFields] = useState({email: '', password: ''});

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.to('.active', {
        height: 'auto',
        duration: '.3',
        ease: 'power2',
        opacity: 1,
      })
    })
    return () => {
      context.revert()
    }
  }, [error])

  const handleChange = (e) => {
    setFields(prevValues => {
        return {...prevValues, [e.target.name]: e.target.value}
    })
  }

  return (
    <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e, fields)}>
      <h1>შესვლა</h1>
      {error && <div className={`error ${error? 'active': ''}`}> <span style={{transform: 'translateY(5px)'}} className="material-symbols-outlined">warning</span> {error} </div>}
      <input type="text" onChange={handleChange} placeholder="მეილი*" name="email" value={fields.email} />
      <input type="password" onChange={handleChange} placeholder="პაროლი*" name="password" value={fields.password} />
      <button type="submit"> შესვლა </button>
    </form>
  )
}

export default LoginForm