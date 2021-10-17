import React, {useState} from 'react'
import { Link , useHistory} from 'react-router-dom'
import Authrocket from 'useauthrocket'
import '../css/index.css'

export default function Register() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fullName, setFullName] = useState()
    const [btn , setBtn] = useState("Register")
    const [err , setErr] = useState()
    const history = useHistory()

    async function handleRegister(e){

      e.preventDefault()

      if (!email || !password || !fullName ) {
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
        const user = await app.createAccount(email, password, {fullName:fullName})
        if(user){
            setBtn("Register")
            console.log(user)
            window.location.href = '/login'
          
        } 
      } catch (err) {
        console.log(err, err.type)
        setBtn("Register")
          if(err.message == "Cannot read properties of undefined (reading 'data')"){
            setErr("Registration failed, check your internet connection and try again")
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
                            <input onChange={(e) => setFullName(e.target.value)} type="text" className="Full Name" placeholder="Full Name" />
                            <input onChange={(e) => setEmail(e.target.value)} type="email" name="email" className="email" placeholder="Email Address" />
                            <input onChange={(e) => setPassword(e.target.value)} type="password" className="password" name="password" placeholder="password" />
                            <button onClick={(e) => handleRegister(e)} type="submit" className="submit auth-btn">{btn}</button>

                            <p className="text-white mt-1 text-left">Already have an account with us? <Link to="/login"> Login</Link></p>
                       </div>
                   </form>
                </div>
                <div className="auth-right m-0 p-0 col-12 col-lg-8 d-none d-lg-block">
 
                </div>
            </div>
       </div>
    )
}
