import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditUser() {

    const { id } = useParams();
    const [item, setItem] = useState({ id: '', name: '', description: '' });
  
    useEffect(() => {
      // Fetch data for the selected item based on the ID
      // You can use the ID to make a request to your Node.js server
      // and retrieve the item's data for editing
      // Set the retrieved data in the 'item' state
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
    <h1>Edit Page</h1>
    <div>
      <label>Name:</label>
      <input
        type="text"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
    </div>
    <div>
      <label>Description:</label>
      <input
        type="text"
        value={item.description}
        onChange={(e) => setItem({ ...item, description: e.target.value })}
      />
    </div>
    <button onClick={handleSave}>Save</button>
  </div>
  )
}
