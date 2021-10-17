import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'


import '../css/index.css'
import axios from 'axios'

export default  function Home() {

    const data = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')
    const [err , setErr] = useState()
    const [btn , setBtn] = useState("Generate")
    const [apiKey , setApiKey] = useState(localStorage.getItem('apiKey') || null)
    const history = useHistory()

    async function generateApiKey(e){
        console.log("ehhh")
        e.preventDefault()
        setBtn("Generating")
        if(localStorage.getItem('apiKey')){
          setBtn("Generate")
          return
        }
        try{
            const key =  await axios.get(`https://authrocket.herokuapp.com/v1/users/getkey/${data.uuid}`,{
            headers: {
               'Content-Type': 'application/json',
               'Authorization': token
            }})
            
            if(key){ 
                setBtn("Generate")
                setApiKey(key.data.apiKey)
                localStorage.setItem('apiKey', key.data.apiKey)
                console.log(key.data.apiKey)
                return
            }

        }catch(err){
             setBtn("Generate")
             if(err.message == "Cannot read properties of undefined (reading 'request')"){
                setErr("request failed, check your internet connection and try again")
                return
              }
             setErr(err.message)
        }
    }

    function signout(){
      
        localStorage.removeItem('token')
        localStorage.removeItem('apiKey')
        localStorage.removeItem('user')
        
    }

    return (
        <div className="dashboard">
          <div className="menu">
              <div className='dashboard-logo' ><img  src="authrocket-logo/vector/default-monochrome.svg" /></div>
              <div>

              </div>
              <div className="user">
                    <div className="d-flex align-items-center ml-auto">
                    <span className="profile"></span>
                  <p className="ml-auto pr-5 pl-2 mt-3">{data.payload.fullName || null}</p>
                    </div>
              </div>
          </div>
          <div className="sub-menu">

              <Link to="/home"><p className="item-1">Users</p></Link>
              <Link to='/application'><p className="active item-3">Application</p></Link>
          </div>  
          <div className="body text-info">
             
                 <div className="app-forms">
                      <form className="app-form ">
                        <p className="text-danger">{err || null}</p>
                        <label>UUID</label>
                        <input type="text" value={data.uuid || null} disabled />
                        <label className="mt-3">Email Address</label>
                        <input type="text" value={data.email || null} disabled />
                        <label className="mt-3">API Key</label>
                        <div className="row">
                            <div className="col-9">
                            <input type="text" value={apiKey} disabled />
                            </div>
                            <div className="col-3">
                                <button onClick={(e) => {e.preventDefault() ; generateApiKey(e)}} className="btn w-100 primary-btn">{btn}</button>
                            </div>
                        </div>
                        <button onClick={() => signout()} className="btn primary-btn w-100 mt-3">Sign out</button>
                      
                      </form>
                 </div>
           </div>
       </div>
    )
}
