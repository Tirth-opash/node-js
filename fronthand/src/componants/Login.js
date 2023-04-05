import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    },)

    const HandleLogin = async () => {
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login', {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);

        if (result.auth) {
            localStorage.setItem("user", JSON.stringify(result.user))
            localStorage.setItem("token", JSON.stringify(result.auth))
            navigate('/')
        }else{
            alert("please Enter the valid detail")
        }
        setEmail("");
        setPassword("");
    }
    return (
        <div>
            <h1>Login</h1>
            <input className='inputbox' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
            <input className='inputbox' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
            <button className='btn' onClick={HandleLogin} type='button'>Login</button>
        </div>
    )
}

export default Login