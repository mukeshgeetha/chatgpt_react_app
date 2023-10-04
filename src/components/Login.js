import React, { useState } from 'react';
import './LoginForm.css'; // Import CSS styles
import { toast } from 'react-toastify';
import axios from 'axios';
import ReactDOM from 'react-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error('Please fill the Email');
      return;
    }
    if (!formData.password) {
      toast.error('Please fill the Password');
      return;
    }
    try {
      const response = await axios.post('http://localhost:5000/api/login', formData);
      console.log([response.data]);
      toast.success(response.data.message);
      navigate('/');
      return null; 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-container">
        <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
