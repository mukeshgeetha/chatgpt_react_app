import React from 'react'
import axios from 'axios';
import  { useState } from 'react';
import { useEffect } from 'react';
import Home from './Home';
import './TableStyle.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router-dom';

export default function ListData() {
  let idCounter = 1; // Initialize the ID counter
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:5000/api/items')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  const style = {
    marginTop: 15,
  };


  const handleDelete = (itemId) => {
    // Send a DELETE request to the server to delete the item
    axios.delete(`http://localhost:5000/api/delete/${itemId}`)
      .then((response) => {
        console.log(response.data);
        // Update the UI by removing the deleted item from the local data
        setData(data.filter(item => item._id !== itemId));
      })
      .catch((error) => {
        console.error(error);
      });
  };


  const sendmail = async (email) => {
    try {
      await axios.post(`http://localhost:5000/api/send-email/${email}`, emailData);
      toast.success("Email sent successfully");
      
      setEmailData({ to: '', subject: '', text: '' });
    } catch (error) {
      console.error(error);
      alert('Failed to send email');
    }
  };

  const [emailData, setEmailData] = useState({
    subject: 'test mail',
    text: 'test mail',
  });
  console.log(emailData);
 

// Define your inline CSS styles as a JavaScript object
const buttonStyle = {
  backgroundColor: 'blue',
  color: 'white',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
};

const deleteStyle = {
  backgroundColor: 'red',
  color: 'white',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
}

const linkStyle = {
  color: 'white',
}

const adduser = {
  backgroundColor: 'green',
  color: 'white',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  float:'right',
}

const whiteText = {
  color: 'white',
};
  return (
    <div>
      <Home/>
      <ToastContainer />
      <button style={adduser}><Link to={'/add/user'} style={whiteText}>Add User</Link></button>
      <table style={style}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{idCounter++}</td>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td> <button style={buttonStyle}><Link style={linkStyle}  to={`/edit/${item._id}`}>Edit</Link></button>&nbsp;
              <button style={deleteStyle} onClick={() => handleDelete(item._id)}>Delete</button>&nbsp;
              <button  onClick={() => sendmail(item.email)} className="send-mail-button">
      <FontAwesomeIcon icon={faEnvelope} className="icon" />
      Send Mail
    </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
