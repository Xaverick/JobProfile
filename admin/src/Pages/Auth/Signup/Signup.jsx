import { useState } from 'react';
import './Signup.scss';
import { Link, useNavigate } from 'react-router-dom';
import {  toast } from 'react-toastify';
import axios from 'axios';

const Signup = () => {
  const Navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',

  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await axios.post('/admin/register', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.status === 200) {
        toast.success('Signup successful', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
  
        setFormData({
          email: '',
          password: '',
          name: '',
        });
  
        setTimeout(() => {
          Navigate('/login');
        }, 1000);
      } else {
        toast.error('Signup failed', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Signup failed', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>SignUp With Us !</h2>
        <p>Fill in the details below to create an account</p>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Enter your username'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder='Enter your name'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Enter your email'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder='Enter your password'
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button type="submit">Signup</button>
        <div className='auth-link'>
          <Link to="/login" className="login">
            Already have an account? Login
          </Link>
        </div>
      </form>

    </div>
  );
};

export default Signup;
