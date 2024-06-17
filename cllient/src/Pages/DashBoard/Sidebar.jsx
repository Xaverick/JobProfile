import React, { useState } from 'react';
import { RiMenuUnfold3Line2 } from "react-icons/ri";
import { RiMenuFold3Line2 } from "react-icons/ri";

const Sidebar = ({ setCurrentView }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div>
      <div className={`h-screen hidden bg-gray-800 text-white lg:flex flex-col z-50  transform transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} ${isCollapsed ? 'w-16' : 'w-64'}`}>
        {/* <button className="text-white w-fit text-right absolute top-1 right-4" onClick={toggleCollapse}>
          {isCollapsed ? ( <div className='text-2xl'> <RiMenuUnfold3Line2 /> </div> ) : <div className='text-xl'> <RiMenuFold3Line2 /></div> }
        </button> */}
        {!isCollapsed && (
          <nav className="flex-1 p-4 py-5">
            <ul className="space-y-4">
              <li>
                <button
                  onClick={() => { setCurrentView('Plan Status')}}
                  className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Plan Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('orderHistory')}}
                  className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Order History
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('profile') }}
                  className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Profile
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCurrentView('services') }}
                  className="w-full text-left py-2 px-4 rounded-lg hover:bg-gray-700"
                >
                  Services
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>

    </div>
  );
};

export default Sidebar;
