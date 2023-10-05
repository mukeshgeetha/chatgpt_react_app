import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import Home from './Home';
export default function EditUser() {

    const { id } = useParams();

  


    const [item, setItem] = useState({ username: '', email: '' });
    const navigate = useNavigate();

console.log(item);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/Userdata/${id}`); 
          setItem(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);
  

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setItem({ ...item, [name]: value });
    };
  


    const handleSubmit = async (e) => {
      e.preventDefault();
  
  

    // Send the updated data to the server
    axios.put(`http://localhost:5000/items/${id}`, item)
      .then((response) => {
        toast.success("Item Updated Successfully");
        navigate('/listdata');
        return null; 
      })
      .catch((error) => {
        console.error(error);
      });
    };



  return (
    
    <div>
      <Home/>
    <h2>Edit Item</h2>
    <ToastContainer />
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="username"
          value={item.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="text"
          name="email"
          value={item.email}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">Save</button>
    </form>
  </div>
  )
}
