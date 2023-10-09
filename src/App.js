import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Login from './components/Login';
import RegisterForm from './components/RegisterForm';
import LandingPage from './components/LandingPage';
import ListData from './components/ListData';
import EditUser from './components/EditUser';
import UserRegistrationForm from './components/UserRegistrationForm';
import AddProduct from './components/AddProduct';


function App() {
  return (
    <Router>
    <Routes>
    <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/listdata" element={<ListData />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/add/user" element={<UserRegistrationForm />} />
      <Route path="/add/product" element={<AddProduct />} />
    </Routes>
  </Router>
  
  );
}

export default App;
