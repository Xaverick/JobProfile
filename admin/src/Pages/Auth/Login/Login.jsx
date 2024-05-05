import { useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import axios from 'axios';


const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const Navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();  
    const response = await axios.post('/admin/login', {
      email,
      password
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (response.status === 200) {
      const data = response.data;
      const { payload, expiresIn } = data; // Assuming the response contains token and expiration
      localStorage.setItem('user', JSON.stringify(payload));
      localStorage.setItem('expiresIn', Date.now() + expiresIn);
      dispatch(login());
      toast.success('Login successful', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
      setEmail('');
      setPassword('');
      setTimeout(() => {
        Navigate('/');
      }, 1000);
    } 
    else {
      toast.error('Login failed', {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        <p>Enter your email below to login to your account</p>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder='Enter your email'
            value={email}
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
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className='auth-link'>
          <Link to="/signup" className="signup">
            Already have an account? Signup
          </Link>
          <a href="#" className="forgot-password">
            Forgot your password?
          </a>

        </div>
    

      </form>

    </div>
    
  );
};

export default Login;