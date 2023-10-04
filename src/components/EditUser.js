import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Home from './Home';

export default function EditUser() {

    const { id } = useParams();
    const [item, setItem] = useState({ id: id, username: '', email: '' });

    const [data, setData] = useState({});
     console.log(data.email);
     console.log(item);
    useEffect(() => {
      // Fetch data from the Node.js backend based on the ID

    axios.get(`http://localhost:5000/api/data/${id}`)
    .then((response) => {
      setData(response.data);
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
    }, [id]);
  
    const handleSave = () => {
      // Send the edited data back to the server to update the item
      // Implement your server request here
    };
  return (
    
    <div>
      <Home/>
    <h1>Edit Page</h1>
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={data.username}
        onChange={(e) => setItem({ ...item, username: e.target.value })}
      />
    </div>
    <div>
      <label>Description:</label>
      <input
        type="text"
        value={data.email}
        onChange={(e) => setItem({ ...item, email: e.target.value })}
      />
    </div>
    <button onClick={handleSave}>Save</button>
  </div>
  )
}
