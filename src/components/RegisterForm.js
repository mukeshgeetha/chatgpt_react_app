import React, { useState } from 'react';
import './RegisterForm.css'; // Import CSS styles
import axios from 'axios';

import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

 

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
      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <div className="register-container">
      <ToastContainer />
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
