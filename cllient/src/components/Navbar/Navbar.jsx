import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import axios from 'axios';

const Navbar = () => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
    }
  }, [isLoggedIn]);

  const handleLogout = async () => {

    try{
      const response = await axios.get('/user/logout')
  
  
      if (!response.ok) {
        localStorage.removeItem('user');
        localStorage.removeItem('expiresIn');
        dispatch(logout());
        window.location.reload();
      }

    } catch(error){
      localStorage.removeItem('user');
      localStorage.removeItem('expiresIn');
      dispatch(logout());
      
    }

  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link to="/">
          <h1 className="font-semibold text-xl tracking-tight">Pinnacle.biz</h1>
        </Link>
        {isLoggedIn && (
          <Link
            to="/dashboard"
            className="ml-8 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 text-lg"
          >
            Dashboard
          </Link>
        )}
      </div>
      <div className="block lg:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-400 hover:text-white hover:border-white"
          onClick={toggleMenu}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className={`w-full block lg:flex lg:items-center lg:w-auto ${showMenu ? 'block' : 'hidden'}`}>
        <div className="text-sm lg:flex-grow lg:text-right">
          {!isLoggedIn ? (
            <>
              <Link
                to="login"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 text-lg"
              >
                Login
              </Link>
              <Link
                to="signup"
                className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white text-lg"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white text-lg"
              onClick={handleLogout}
            >
              Logout
            </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
