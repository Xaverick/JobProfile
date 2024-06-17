import { useState, useEffect } from "react";
import {HiMenuAlt4, HiX} from "react-icons/hi"
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import axios from "axios";
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import logo from "../../assets/logo.webp";


const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      dispatch(logout());
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
    try {
      const response = await axios.get("/user/logout");

      if (!response.ok) {
        localStorage.removeItem("user");
        localStorage.removeItem("expiresIn");
        dispatch(logout());
        window.location.reload();
      }
    } catch (error) {
      localStorage.removeItem("user");
      localStorage.removeItem("expiresIn");
      dispatch(logout());
    }
  };
  const [toggle, setToggle] = useState(false);
  return (
    <>
      
      <nav className="app__navbar">
        <div className='app__navbar-menu'>
          <HiMenuAlt4 onClick={() => setToggle(true)} />
          {toggle && (
            <div>
                <ul className='app__navbar-links'>   
                  <HiX onClick={() => setToggle(false)} />
                  { isLoggedIn ? 
                    <>
                      <li className='app__flex p-text' onClick={() => setToggle(false)}>
                        <a
                          href="#"
                          className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white text-lg"
                          onClick={handleLogout}
                        >
                          Logout
                        </a>

                      </li>
                      
                      <li className='app__flex p-text' onClick={() => setToggle(false)}>
                        <Link to="/dashboard">Dashboard </Link>
                      </li>
                      <li className="app__flex p_text" onClick={() => setToggle(false)}>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="app__flex p_text" onClick={() => setToggle(false)}>
                        <Link to="/orderhistory">Order History</Link>
                      </li>                   
                      <li className="app__flex p_text" onClick={() => setToggle(false)}>
                        <Link to="/plans">Services</Link>
                      </li>
                  
                    </> : 
                    <>
                      <li className='app__flex p-text' onClick={() => setToggle(false)}>
                        <Link to='/login'>Login</Link>
                      </li>

                      <li className='app__flex p-text' onClick={() => setToggle(false)}>
                        <Link to='/signup'>Signup</Link>
                      </li>
                    </>

                  }


                  </ul>
            </div>
          )}
        </div>
        
        <div className="left">
          <div className="app__navbar-logo">
            <img src={logo} alt="logo" />
          </div>
          <Link to="/">
            <h1 className="font-semibold text-xl tracking-tight  ml-3 lg:ml-0">
              Pinnacle.biz
            </h1>
          </Link>

          <ul className='app__navbar-links'>  

            {isLoggedIn && (
              <li className='app__flex p-text'>
                <Link to="/dashboard">Dashboard</Link>
              </li>
            )} 

    
          </ul>

        </div>
       
        <ul className='app__navbar-links'>   

        { isLoggedIn ? 
          <>
            <li className='app__flex p-text'>
              <a
                href="#"
                className="block mt-4 lg:inline-block lg:mt-0"
                onClick={handleLogout}
              >
                Logout
              </a>
            </li>
            {/* <img
              src={user?.picture}
              alt="User Avatar"
              className="w-8 h-8 rounded-full ml-4 mr-4"
            /> */}
          </> : 
          <>
            <li className='app__flex p-text'>
              <Link to='/login'>Login</Link>
            </li>

            <li className='app__flex p-text'>
              <Link to='/signup'>Signup</Link>
            </li>
          </>

          }
    
        </ul>

        

      </nav>
    </>

  )
}

export default Navbar