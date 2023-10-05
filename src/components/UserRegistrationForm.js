import React, { useState } from 'react';
import Home from './Home';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserRegistrationForm() {

    const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  console.log(formData);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username) {
      toast.error('Please fill the Name');
      return;
    }
    if (!formData.email) {
      toast.error('Please fill the Email');
      return;
    }
    if (!formData.password) {
      toast.error('Please fill the Password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);
      console.log(response.data);
      if(response.data.message=='Email already exists'){
        toast.error("This email is already registered");
      }else{
        toast.success(response.data.message);
        navigate('/listdata');
        return null;
      }
       
    } catch (error) {
      console.error(error);
    }
  };

  const formStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '3px',
    border: '1px solid #ccc',
  };

  const buttonStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    border: 'none',
  };

  return (
    <div>
        <Home/>
      <h2>User Registration</h2>
      <ToastContainer />
      <form style={formStyle} onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleInputChange}
          style={inputStyle}
        />
       
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
    </div>
  );
}

export default UserRegistrationForm;
