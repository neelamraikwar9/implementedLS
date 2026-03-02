import React from 'react'
import {useState, useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(''); 
  const [products, setProducts] = useState(""); 

  const navigate = useNavigate(); 

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []); 

  const hanldeLogout = (e) => {
    localStorage.removeItem('token'); 
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Loggedout')
    setTimeout(() => {
      navigate("/login");
    }, 1000)
     
  }

  const fetchProducts = async () => {
    try{
      const url = "https://implementedlsback.vercel.app/products"; 
      const headers = {
        headers: {
          'Authorization': localStorage.getItem('token') 
        }
      }
      const response = await fetch(url, headers); 
      const result = await response.json(); 
       console.log(result, "result"); 
       setProducts(result); 

    } catch(err){
      handleError(err)
    }
  }

  useEffect(() => {
    fetchProducts()
  })


  return (
    <div>
      <h1>Wlcome{loggedInUser}</h1>
      <button onClick={hanldeLogout}>Logout</button>
      <div>
        {products &&
          products?.map((item, index) => (
            <ul key={index}>
              <li>
                {item.name} : {item.price}
              </li>
            </ul>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
}

export default Home
