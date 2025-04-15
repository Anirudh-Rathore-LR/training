"use client";
import React, { useState } from "react";
import Profile from "./profile";


export default function Auth() {
    const [isLogIn, setIsLogIn] = useState(true);
    const [isLoggedIn,setLoggedIn] = useState(false);
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        password: '',
        phoneId: ''
    });

    const [signInData, setSignInData] = useState({
        email: '',
        password: '',
    });

    const handleSignInChange = (e) => {
        const { name, value } = e.target;
        setSignUpData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSignInData(prev => ({
            ...prev,
            [name]: value
        }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogIn) {
                login()
            } else {
                register();
            }

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const register = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append("X-LoginRadius-Sott", "gLfx8qSWFDcjK87hLilbjpsANNF3zekc7VDc9GkqzdWB8sWxIlhxG9DzyT+YAh5AC9g31YzUwLqweruFfEaq6aF7mflXpCU8iuWlv9VCe1s=*61e3daece89d7891aa0b912891ddd776");
        const raw = JSON.stringify({
            "FirstName": signUpData.firstName,

            "LastName": signUpData.lastName,

            "Gender": signUpData.gender,

            "Email": [
                {
                    "Type": "string",
                    "Value": signUpData.email
                }
            ],
            "Password": signUpData.password,
            "PhoneId": signUpData.phoneId
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",

        };

        fetch("https://api.loginradius.com/identity/v2/auth/register?apikey=85a8818a-2dd4-4d72-82de-dd7e53cf56a4&emailtemplate=123", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                alert(result);
                if (!(result.errorCode)) {
                    setSignUpData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        gender: '',
                        password: '',
                        phoneId: ''
                    })
                    setIsLogIn(true);
                }
            })
            .catch((error) => console.error(error));
    }
    const login = async () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");

        const raw = JSON.stringify({
            "email": signInData.email,
            "password": signInData.password,
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };

        fetch("https://api.loginradius.com/identity/v2/auth/login?apikey=85a8818a-2dd4-4d72-82de-dd7e53cf56a4", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                alert(result);
                if (!result.includes("ErrorCode")) {

                    setLoggedIn(true);
                }
            })
          .catch((error) => console.error(error));
    }
    return (
        
        isLoggedIn ?<Profile email={signInData.email}></Profile>:

      
        <div style={{
            height: 'auto',
            padding: '20px', maxWidth: '400px', margin: ' 10% auto', display: 'flex', justifyContent: 'space-evenly', alignContent: 'center', flexDirection: 'column', borderColor: '#008ECF', borderRadius: '30px', borderStyle: 'solid'
        }}>
            {!isLogIn ? (
                <form onSubmit={handleSubmit}>
                    <h2 class='heading'>Sign In</h2>

                    <label class='label'>First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={signUpData.firstName}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <br></br>
                    <label class='label'>Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={signUpData.lastName}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <br />
                    <label class='label'>Gender</label>
                    <input
                        type="text"
                        name="gender"
                        value={signUpData.gender}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <br />
                    <label class='label'>PhoneId</label>
                    <input
                        type="text"
                        name="phoneId"
                        value={signUpData.phoneId}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <br></br>
                    <label class='label'>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={signUpData.email}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <label class='label'>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={signUpData.password}
                        onChange={handleSignInChange}
                        class="input"
                    />
                    <br></br>
                    <button class="button" type="submit">Submit</button>
                </form>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 class='heading'>Sign In</h2>

                    <label class='label'>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={signInData.email}
                        onChange={handleSignUpChange}
                        class="input"
                    />
                    <br></br>
                    <label class='label'>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={signInData.password}
                        onChange={handleSignUpChange}
                        class="input"
                    />
                    <br></br>
                    <button class="button" type="submit">Submit</button>
                </form>

            )}

            <button class="switch" onClick={() => setIsLogIn(!isLogIn)} style={{ marginTop: '10px' }}>
                Switch to {isLogIn ? 'Sign Up' : 'Sign In'}
            </button>
        </div>
        
    );
}