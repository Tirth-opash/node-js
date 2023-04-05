import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SingUp() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/")
        }
    },)

    const addData = async () => {
        // console.log(name, email, password)
        let result = await fetch('http://localhost:5000/register', {
            method: "POST",
            body:JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json();
        console.log(result);
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))

        if (result) {
            navigate('/')
        }

        setName("");
        setEmail("");
        setPassword("");
    }
    return (
        <div>
            <h1>Register</h1>
            <input className='inputbox' value={name} type='text' onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
            <input className='inputbox' value={email} type='text' onChange={(e) => setEmail(e.target.value)} placeholder='Enter email' />
            <input className='inputbox' value={password} type='password' onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
            <button className='btn' onClick={addData} type='button'>SingUp</button>
        </div>
    )
}

export default SingUp