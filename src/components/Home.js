import React from 'react';
import LandingPage from './LandingPage';
import { Link } from 'react-router-dom';
import './HomePage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';
import './LandingCss.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import  { useState } from 'react';
import { useEffect } from 'react';

function Home() {


  const [usernamedata, setUsername] = useState(null); 

console.log(usernamedata);

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/get-session-data'); // Replace with your server route
        setUsername(response.data.username);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSessionData();
  }, []);

  

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:5000/api/logout');
      navigate('/login');
      return null; 
    } catch (error) {
      console.error(error);
    }
  };
  const condition = true; 
  return (

    
    <div className='fulldiv'>
   
      
      <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/listdata">list</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        
        <li id='username'>
        <Dropdown>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        Select an Option
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#option1">{usernamedata}</Dropdown.Item>
        <Dropdown.Item href="#option2" onClick={handleLogout}>Logout</Dropdown.Item>
        
      </Dropdown.Menu>
    </Dropdown>
        </li>
        {/* <LandingPage/> */}
    </div>
  
  
  );
}

export default Home;
