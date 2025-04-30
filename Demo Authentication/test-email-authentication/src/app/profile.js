'use client'
import React, { useEffect } from 'react'

import { useState } from 'react'

export default function Profile(email) { 
  const [isFetching,setIsFetching] =  useState(true);
  const [user,setUser] = useState({FirstName:'',LastName:'',Gender:'',PhoneId:''});
  const myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", "Bearer "+localStorage.getItem('token'))
  
  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };
  
  useEffect(() => {
  fetch(`https://api.loginradius.com/identity/v2/auth/account?apikey=976ccf2e-ed66-41ed-a032-b9223f7dda91`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      const user = JSON.parse(result);
      setUser({...user});
      setIsFetching(false);
    })
    .catch((error) => console.error(error));
    
  },[])
      return (

        isFetching ? <div>Loading Data...</div> : 
        <div style={{overflow:'hidden'
        }}>
          <h3 style={{marginLeft:'20px',marginTop:'50px'}}>Hi {user.FirstName} please find your info below</h3>
        <div className="profile-container" style={{overflow: 'hidden'
        }}>
          <div className="profile-card">
            <h2 className="profile-name">{user.FirstName +" "+ user.LastName}</h2>
            <p className="profile-email">Email : {user.Email[0].Value}</p>
            <p className="profile-location">Gender : {user.Gender}</p>
          </div>
          <button className="button" style={{margin:'10px'}}  onClick={() => {
            localStorage.removeItem('token');
            window.location.reload();
          }}>Logout</button>
        </div>
        </div>
      );
}