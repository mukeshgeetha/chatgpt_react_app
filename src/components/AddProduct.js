import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import  { useState } from 'react';
import axios from 'axios';
export default function AddProduct() {

  
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };




  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);
    formData.append('username', username);
    formData.append('email', email);
    console.log(formData);
    try {
      await axios.post('http://localhost:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      alert('Error uploading image');
    }
  };

  return (
    <div>
      <h2>Upload an Image</h2>
       <div className='mb-3'>
       <label className="form-label">Product Number</label>
       <input type="file" className='form-control' onChange={handleFileChange} />
       </div>
      <div className='mb-3'>
      <label className="form-label">Product Number</label>
      <input
        type="text" className='form-control'
        placeholder="Username"
        value={username}
        onChange={handleUsernameChange}
      />
      </div>
  
    <div className='mb-3'>
    <label className="form-label">Product Number</label>
    <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={handleEmailChange}
      />

    </div>

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
