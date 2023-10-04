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
    </Routes>
  </Router>
  
  );
}

export default App;
