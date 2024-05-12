import { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  
  
  
  useEffect(() => {
    if(!isLoggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {
      const response = await fetch('http://localhost:4000/user/logout', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        
      });

      if (!response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('expiresIn');
      }

      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
      <div className="navbar-left">
        <Link to="/" ><h1 className="navbar-logo">PINNACLE</h1></Link>
        <Link to="/searchJob" className="navbar-link">Search Job</Link>
        {isLoggedIn && <Link to="/yourProfile" className="navbar-link">Your Profile</Link>}
         {isLoggedIn && <Link to="/makeProfile" className="navbar-link">Make Your Profile</Link>}

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
              <Link to="signup" className="navbar-link">Signup</Link>
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



// import { useState } from 'react';
// import './Navbar.scss';
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';

// const Navbar = () => {
//   const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
//   const dispatch = useDispatch();
//   const [showMenu, setShowMenu] = useState(false);
//   const [showProfileMenu, setShowProfileMenu] = useState(true); // State to control profile menu visibility

//   const handleLogout = async () => {
//     const response = await fetch('http://localhost:4000/user/logout', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
      
//     });

//     if (!response.ok) {
//       localStorage.removeItem('user');
//       localStorage.removeItem('expiresIn');
//     }

//     localStorage.removeItem('user');
//     localStorage.removeItem('expiresIn');
//     dispatch(logout());


// };

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   const toggleProfileMenu = () => {
//     setShowProfileMenu(!showProfileMenu);
//   };

//   return (
//     <nav className={`navbar ${showMenu ? 'show-menu' : ''}`}>
//       <div className="navbar-left">
//         <Link to="/"><h1 className="navbar-logo">PINNACLE</h1></Link>
//         <Link to="/searchJob" className="navbar-link">Search Job</Link>
//         {/* Conditionally render profile link if user is logged in */}
//         {isLoggedIn && <Link to="/yourProfile" className="navbar-link">Your Profile</Link>}
//         {/* Conditionally render make profile link if user is logged in */}
//         {isLoggedIn && <Link to="/makeProfile" className="navbar-link">Make Your Profile</Link>}
//       </div>
//       <div className="navbar-right">
//         <div className="profile-circle" onMouseEnter={toggleProfileMenu} onMouseLeave={toggleProfileMenu}>
//           {/* Profile circle icon */}
//           <div className="profile-icon"></div>
//           {/* Dropdown menu for profile actions */}
//           {showProfileMenu && (
//             <div className="profile-menu">
//               {/* Option to see user's profile */}
//               <Link to="/profile" className="menu-item">View Profile</Link>
//               {/* Option to delete user's profile */}
//               <Link to="/deleteProfile" className="menu-item">Delete Profile</Link>
//               {/* Option to edit user's profile */}
//               <Link to="/editProfile" className="menu-item">Edit Profile</Link>
//             </div>
//           )}
//         </div>
//         <div className="menu-icon" onClick={toggleMenu}>
//           <span></span>
//           <span></span>
//           <span></span>
//         </div>
//         <div className={`menu-items ${showMenu ? 'show' : ''}`}>
//           {!isLoggedIn ? (
//             <>
//               <Link to="login" className="navbar-link">Login</Link>
//               <Link to="signup" className="navbar-link">Signup</Link>
//             </>
//           ) : (
//             <a href="#" className="navbar-link" onClick={handleLogout}>Logout</a>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
