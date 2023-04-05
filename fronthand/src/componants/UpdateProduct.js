import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';

function UpdateProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const params=useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        getProductDetail();
    },[])

    const getProductDetail=async()=>{
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"GET",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result=await result.json();
        console.log(result);
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category)
        setCompany(result.company)
    }


    const UpdateHandler = async () => {
        // console.log(name, price, category, company);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:"PUT",
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result=await result.json();
        console.log(result);
        navigate("/");

    }
    return (
        <div>
            <h1>Update Product</h1>
            <input type="text" value={name} className='inputbox' onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
            <input type="text" value={price} className='inputbox' onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
            <input type="text" value={category} className='inputbox' onChange={(e) => setCategory(e.target.value)} placeholder='Enter category' />
            <input type="text" value={company} className='inputbox' onChange={(e) => setCompany(e.target.value)} placeholder='Enter company' />
            <button className='btn' onClick={UpdateHandler}>Update Item</button>
        </div>
    )
}

export default UpdateProduct