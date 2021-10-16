import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Authrocket from 'useauthrocket'
import '../css/index.css'

export default function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [btn , setBtn] = useState("Login")
    const [err , setErr] = useState()

    async function handleLogin(e){

      e.preventDefault()

      if (!email || !password) {
        setErr("Incomplete Input")    
        return   
    } 
    
    if(password.length < 6 ){
        setErr("Password Length Must Be Up To Six ")
        return
    }
    setBtn("Please wait...")
      const app = Authrocket.initializeApp({
          apiKey:'Z8NCDZW-D0Y4SZ0-MC2KRWD-5V9P7TG',
          appName:'stan' 
      })

      try {
        const user = await app.login(email, password)
        if(user){
            setBtn("Login")
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user))
            setTimeout(() => {
                window.location.href = '/home'
            }, 1000);
        } 
      } catch (err) {
        console.log(err, err.type)
        setBtn("Login")
          if(err.message == "Cannot read properties of undefined (reading 'data')"){
            setErr("Login failed, check your internet connection and try again")
            return
          }
        
          setErr(err.message)
          
      }

    }

    return (
       <div className="login">
            <div className="row">
                <div className="col-12 m-0 p-0 col-lg-4">
                    <div className="logo">
                        <img src="/authrocket-logo/vector/default-monochrome.svg" />
                    </div>
                   <form className="form">
                       <div className="form-box">
                            <p className="text-danger">{err || null}</p>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="email" placeholder="Email Address" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="password" name="password" placeholder="password" />
                            <button onClick={(e) => handleLogin(e)} type="submit" className="submit auth-btn">{btn}</button>

                            <p className="text-white mt-1 text-left">Already have an account with us? <Link to="/register">Register</Link></p>
                       </div>
                   </form>
                </div>
                <div className="auth-right m-0 p-0 col-12 col-lg-8 d-none d-lg-block">
 
                </div>
            </div>
       </div>
    )
}
