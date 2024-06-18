import { useState, useEffect } from "react";
import {HiMenuAlt4, HiX} from "react-icons/hi"
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../../store/slices/authSlice";
// import axios from "axios";
import "./Navbar.scss";
import { Link } from 'react-router-dom';
import logo from "../../../../assets/logo.webp";


const Navbar = () => {
  // const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("user"));
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("expiresIn");
  //     dispatch(logout());
  //   }
  // }, [isLoggedIn]);

  // const handleLogout = async () => {
  //   try {
  //     const response = await axios.get("/user/logout");

  //     if (!response.ok) {
  //       localStorage.removeItem("user");
  //       localStorage.removeItem("expiresIn");
  //       dispatch(logout());
  //       window.location.reload();
  //     }
  //   } catch (error) {
  //     localStorage.removeItem("user");
  //     localStorage.removeItem("expiresIn");
  //     dispatch(logout());
  //   }
  // };
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

                  <li className='app__flex p-text'>
                    <a href='#home' onClick={() => setToggle(false)}>Home</a>
                  </li>
                  <li className='app__flex p-text'>
                    <a href='#about' onClick={() => setToggle(false)}>About Us</a>
                  </li>

                  <li className='app__flex p-text'>
                    <a href='#work' onClick={() => setToggle(false)}>Services</a>
                  </li>

                  <li className='app__flex p-text'>
                    <a href='#contact' onClick={() => setToggle(false)}>Contact</a>
                  </li>



                </ul>
            </div>
          )}
        </div>
        
        <div className="left">
          <div className="app__navbar-logo">
            <img src={logo} alt="logo" />
          </div>
          <Link to="/">
            <h1 className="font-semibold text-xl tracking-tight ml-3 lg:ml-0">
              Pinnacle.biz
            </h1>
          </Link>
{/* 
          <ul className='app__navbar-links'> 
           
            <li className='app__flex p-text'>
              <Link to="/dashboard"></Link>
            </li>
              
          </ul> */}

        </div>
       
        <ul className='app__navbar-links'>   

          <li className='app__flex p-text'>
            <a href='#home'>Home</a>
          </li>

          <li className='app__flex p-text'>
            <a href='#about'>About Us</a>
          </li>

          <li className='app__flex p-text'>
            <a href='#work'>Services</a>
          </li>

          <li className='app__flex p-text'>
            <a href='#contact'>Contact</a>
          </li>

        </ul>

        

      </nav>
    </>

  )
}

export default Navbar