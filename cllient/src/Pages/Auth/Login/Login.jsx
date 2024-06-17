import { useEffect, useState } from 'react';
import './Login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { login } from '../../../store/slices/authSlice';
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import Loader from '../../../components/Loader/Loader';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const Navigate = useNavigate();
  const googleAuth = () => {
    
    const link = import.meta.env.DEV ? import.meta.env.VITE_LOCALHOST : import.meta.env.VITE_PRODUCTION
    
    window.open(
			`${link}/auth/google/callback`,
			"_self"
		);
  };

  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };


  useEffect(() => {

    const getDetails = async () => {
      try {
        const response = await axios.get('/auth/getDetails', 
          {
            withCredentials: true
          }
        );
    
        const { data, status } = response;
    
        if (status === 200) {
          const { payload, expiresIn } = data;
          localStorage.setItem('user', JSON.stringify(payload));
          localStorage.setItem('expiresIn', expiresIn);
          dispatch(login());
          toast.success('Login successful', {
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
          });
          setEmail('');
          setPassword('');
          setTimeout(() => {
            Navigate('/dashboard');
          }, 1000);
        } else {
          throw new Error('Login failed');
        }
      } catch (error) {
        console.log('Error during login:', error);
      }
    }
    if(localStorage.getItem('isLoggedIn') === 'true') {
      Navigate('/dashboard');
    }
    else{
      getDetails();
    }

    
  })

  const handleSubmit = async (event) => {
    event.preventDefault();  
    try {
      setLoading(true);
      const response = await axios.post('/user/login', {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      const { data, status } = response;
  
      if (status === 200) {
        const { payload, expiresIn } = data;
        localStorage.setItem('user', JSON.stringify(payload));
        localStorage.setItem('expiresIn', expiresIn);
        dispatch(login());
        toast.success('Login successful', {
          position: "top-left",
          autoClose: 2000,
          hideProgressBar: true,
        });
        setLoading(false);
        setEmail('');
        setPassword('');
        setTimeout(() => {
          Navigate('/dashboard');
        }, 1000);

      } else {
        setLoading(false);
        throw new Error('Login failed');
      }
    } catch (error) {
      setLoading(false);
      toast.error(`${error.response.data}`, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="login-container">
      {loading && <Loader loading={loading} message={'Logging in...'}/>}
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
        <div className='flex justify-center m-2 text-lg'> Or</div>
        <a className="googleButton" onClick={googleAuth}>
						<span className="icon"><FcGoogle /></span> &nbsp; Sign in with Google
        </a>   
        <div className='auth-link'>
          <Link to="/signup" className="signup">
            Don&apos;t have an account? Signup
          </Link>
          <Link to="/forgotpassword" className="signup">
            Forgot Password? Click here to reset
          </Link>
        </div>
      </form>

    </div>
    
  );
};

export default Login;