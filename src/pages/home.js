import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import {getKey} from '../hooks/index'
import { ArrowClockwise } from 'phosphor-react'

import '../css/index.css'

export default  function Home() {

    const data = JSON.parse(localStorage.getItem('user'))
    const [err , setErr] = useState()
    const token = localStorage.getItem('token')
    const [users , setUsers] = useState([])
    const [key , setKey] = useState(localStorage.getItem('apiKey') || null)

    async function getUsers(){
         document.getElementsByClassName("spinner")[0].classList.add("rotate")
        
        try{

            
            if(!localStorage.getItem('apiKey')){
                const key =  await axios.get(`https://authrocket.herokuapp.com/v1/users/getkey/${data.uuid}`,{
                    headers: {
                       'Content-Type': 'application/json',
                       'Authorization': token
                    }})
                console.log(key.data.apiKey, "test2")
                setKey(key.data.apiKey)
            }
            
            if(key){ 
                //3276K0P-PAXM4Y9-N87ZKKJ-DYTANVN
                 console.log(data.apiKey)
                const users =  await axios.get(`https://authrocket.herokuapp.com/v1/users/getusers/${key}`,{
                    headers: {
                       'Content-Type': 'application/json',
                       'Authorization': token
                    }})

                setUsers(users.data.data)
                console.log(users.data.data)
                document.getElementsByClassName("spinner")[0].classList.remove("rotate")
                return 
            }

        }catch(err){
             console.log(err.message, "error occured")
             document.getElementsByClassName("spinner")[0].classList.remove("rotate")
             if(err.message == "Cannot read properties of undefined (reading 'data')" || err.message == "Request failed with status code 500"){
                setErr("Login failed, check your internet connection and try again")
                return
              } 
             setErr(err.message)
        }
    }
    
    useEffect(() => {
        getUsers()
    }, [])
    useEffect(() => {
       console.log(users.length >= 1)
    }, [users])

    
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

              <Link to="/home"><p className="active item-1">Users</p></Link>
              <Link to='/application'><p className="item-3">Application</p></Link>
          </div>  
          <div className="body text-info">
             
                 <div className="card">
                    <div onClick={() => getUsers()} className="rotate spinner  ml-auto mt-3 mr-4 reload">
                        
                             <ArrowClockwise size={28} />
                    </div>
                   
                 <table className="table">
                        <thead>
                            <tr>
                            <th>Index</th>
                            <th>Email</th>
                            <th>Created</th>
                            <th>App Name</th>
                            <th>Email Verified</th>
                            <th>User uid</th>
                          
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users[0] ?
                                users.map((user, index) => (
                                    <tr>
                            
                                    <td>{index + 1|| null}</td>
                                    <td>{user.email || null}</td>
                                    <td>{moment(user.createdAt).utc().format('YYYY-MM-DD') || null}</td>
                                    <td>{user.appName || null}</td>
                                    <td>{`${user.isEmailVerified}`}</td>
                                    <td>{user.uuid || null}</td>
                                    </tr>
                                ))
                                : null
                            }

                        </tbody>
                        </table>
                 </div>
           </div>
       </div>
    )
}
