import React from 'react'
import axios from 'axios';
import  { useState } from 'react';
import { useEffect } from 'react';
import Home from './Home';
import './TableStyle.css';
import { Link } from 'react-router-dom';

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



  return (
    <div>
      <Home/>
      
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
              <td><Link to={`/edit/${item._id}`}>Edit</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
