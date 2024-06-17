import { useState } from 'react';
import './Navbar.scss';
import { Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import axios from 'axios';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
      const response = await axios.get('/admin/logout');
      
      if (response.status === 200) {
        localStorage.removeItem('user');
        localStorage.removeItem('expiresIn');
        navigate('/login');
        dispatch(logout());
      }

      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
      navigate('/login');
      
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
      <div className="navbar-left">
        <Link to="/" ><h1 className="navbar-logo">PINNACLE</h1></Link>
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/createplan" className="navbar-link">Create Plan</Link>
        {/* <Link to="/upload" className="navbar-link">Upload Resumes</Link> */}
        {/* {isLoggedIn && <Link to="/yourProfile" className="navbar-link">Your Profile</Link>} */}
         {/* {isLoggedIn && <Link to="/makeProfile" className="navbar-link">Make Your Profile</Link>} */}

      </div>
      <div className="navbar-right">
        <div className="menu-icon" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div className={`menu-items ${showMenu ? 'show' : ''}`}>
          {!isLoggedIn ? (
            <>
              <Link to="login" className="navbar-link">Login</Link>
            </>
          ) : (
            <a href="#" className="navbar-link" onClick={handleLogout}>Logout</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;



