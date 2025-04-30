"use client";
import React, { useState, useEffect } from "react";
import Profile from "./profile";
import Snackbar from "./snackbar/snackbar";

export default function Auth() {
    const apiKey = '976ccf2e-ed66-41ed-a032-b9223f7dda91'
    const sott = 'Nbay0YCZNIy6Meql0VskoQMAXnCmYGsf8+IvSSZyQtQDHNMAEIPd9xOdsYP3KNKXcMLcLTAooflKGOJbVYfU3CyZSnUCzOcJHR3jYw4flNs=*330b47a2483be0ee9a3d176a02ba56f7'
    const [isLogIn, setIsLogIn] = useState(true);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [signUpData, setSignUpData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        gender: '',
        password: '',
        phoneId: ''
    });
    const [isLoading, setIsLoading] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", `Bearer ${token}`);

            const requestOptions = {
                headers: myHeaders,
                redirect: "follow",
            };
            try {
            fetch(
                `https://api.loginradius.com/identity/v2/auth/access_token/Validate?apikey=${apiKey}`,
                requestOptions
            )
                .then((response) => response.text())
                .then((result) => {
                    const data = JSON.parse(result);
                    setIsLoading(false);
                    if (!data.ErrorCode) {
                        setLoggedIn(true);
                    }
                })
                .catch((error) => console.error("Token validation error:", error));
            } catch(err) {
                console.log("error ",err)
            }
        }
         else {
            setIsLoading(false)
         }
    }, []);

    const showMessage = (msg) => {

        setSnackbarMessage(msg);

        setSnackbarOpen(true);
    };
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
        myHeaders.append("X-LoginRadius-Sott", sott);
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

        fetch(`https://api.loginradius.com/identity/v2/auth/register?apikey=${apiKey}&emailtemplate=123`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result);
                let message = result.Message;
                if (!(result.ErrorCode)) {
                    setSignUpData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        gender: '',
                        password: '',
                        phoneId: ''
                    })
                    setIsLogIn(true);
                    message = "Singup successful! Please Verify before login."

                }
                showMessage(message);
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

        fetch(`https://api.loginradius.com/identity/v2/auth/login?apikey=${apiKey}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                result = JSON.parse(result)
                showMessage(result.Message);
                if (!result.ErrorCode) {
                    localStorage.setItem('token', result.access_token)
                    setLoggedIn(true);
                }
            })
            .catch((error) => console.error(error));
    }
    return (
        isLoading ? <div style={{ height: '100vh', width: '100vw', backgroundColor: 'white', overflow: 'hidden', display: 'flex',
            alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
            backgroundImage: 'url(https://img.freepik.com/free-vector/abstract-secure-technology-background_23-2148331624.jpg?t=st=1745988060~exp=1745991660~hmac=90f7120b2f31d970a7a17dead0fe8ebfea3e74db4933ce0f8ec39668a7a61619&w=1380'
        }}>
            <h1>Loading...</h1>
        </div> :
        isLoggedIn ? <Profile email={signInData.email}></Profile> :


            <div style={{
                height: 'auto',
                padding: '20px', maxWidth: '400px', width: '25%',
                display: 'flex', justifyContent: 'space-evenly', alignContent: 'center',
                flexDirection: 'column', borderColor: '#008ECF', borderRadius: '30px',
                borderStyle: 'solid'
            }}>
                <Snackbar
                    message={snackbarMessage}
                    isOpen={snackbarOpen}
                    onClose={() => setSnackbarOpen(false)}
                />
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