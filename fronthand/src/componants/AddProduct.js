import React, { useState } from 'react'

function AddProduct() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [company, setCompany] = useState("");
    const [error, setError] = useState(false);

    const AddHandler = async () => {
        // console.log(name, price, category, company);
        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        console.log(result);

        setName("")
        setPrice("")
        setCategory("")
        setCompany("")
    }


    return (
        <div>
            <h1>Add Product</h1>
            <input type="text" value={name} className='inputbox' onChange={(e) => setName(e.target.value)} placeholder='Enter name' />
            {error && !name && <div className='error_div'><span className='invalid'>Enter valid name</span></div>}
            <input type="text" value={price} className='inputbox' onChange={(e) => setPrice(e.target.value)} placeholder='Enter price' />
            {error && !price && <div className='error_div'><span className='invalid'>Enter valid price</span></div>}
            <input type="text" value={category} className='inputbox' onChange={(e) => setCategory(e.target.value)} placeholder='Enter category' />
            {error && !category && <div className='error_div'><span className='invalid'>Enter valid category</span></div>}
            <input type="text" value={company} className='inputbox' onChange={(e) => setCompany(e.target.value)} placeholder='Enter company' />
            {error && !company && <div className='error_div'><span className='invalid'>Enter valid company</span></div>}<br />
            <button className='btn' onClick={AddHandler}>Add Item</button>
        </div>
    )
}

export default AddProduct