import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Nav() {
    const auth = localStorage.getItem("user");
    const navigate = useNavigate();
    const Logout = () => {
        localStorage.clear();
        navigate("/")
    }
    return (
        <div>
            {auth ?
                <ul className='navbar'>
                    <li><Link to="/">Products</Link></li>
                    <li><Link to="/add">Add Products</Link></li>
                    <li><Link to="/update">Update Products</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={Logout} to="/register">Logout ({JSON.parse(auth).name})</Link></li>
                </ul> : 
                <ul className='navbar nav_right'>
                    <li><Link to="/register">SingUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav