import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, [])

    const getProducts = async () => {
        let result = await fetch('http://localhost:5000/products',{
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        let result1 = await result.json();
        setProducts(result1);
    }
    // console.log(products);

    const onDeleteHanler = async (id) => {
        // console.log(id);
        let result = await fetch(`http://localhost:5000/product/${id}`, {
            method: "DELETE",
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        result = await result.json();
        console.log(result);
        if (result) {
            getProducts()
        }
    }

    const searchHandler = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`,{
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem("token"))}`
                }
            })
            result = await result.json();
            if (result) {
                setProducts(result)
            }
        } else {
            getProducts();
        }
    }
    return (
        <div>
            <h1>Product List</h1>
            <input type='text' className='search' placeholder='Search...' onChange={searchHandler} />
            {products.length > 0 ? 
            <table border="1" className='table'>
                <tbody>
                <tr className='product_list'>
                    <th>s.no</th>
                    <th>name</th>
                    <th>price</th>
                    <th>category</th>
                    <th>company</th>
                    <th>delete</th>
                    <th>update</th>
                </tr>
                {
                    products.map((item, index) => (
                        <tr className='product_list' key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>$ {item.price}</td>
                            <td>{item.category}</td>
                            <td>{item.company}</td>
                            <td><button className='delete' onClick={() => onDeleteHanler(item._id)}>delete</button></td>
                            <td><Link to={"/update/" + item._id}>update</Link></td>
                        </tr>

                    ))
                }
                </tbody>
            </table>:<h1>No Record Found</h1>}
        </div>
    )
}

export default ProductList