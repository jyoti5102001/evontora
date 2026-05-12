import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import {AuthContext} from '../context/AuthContext.jsx';
import { FaTicketAlt } from 'react-icons/fa';


export const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = React.useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <FaTicketAlt className="text-2xl" />    
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
          <Link to ={user.role === 'admin' ? '/admin' : '/dashboard'} className="text-white hover:text-gray-300">Dashboard</Link>
            <span>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Logout
            </button>
          </>
        ) : (
            <>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="text-white hover:text-gray-300">
            Sign up
          </Link>       
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar;