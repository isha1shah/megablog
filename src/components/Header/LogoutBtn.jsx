
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const LogoutBtn = ({ variant = "solid", fullWidth = false, size = "medium" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Handler for logout
  const logoutHandler = async () => {
    if (isLoading) return; // Prevent multiple clicks
    
    setIsLoading(true);
    
    try {
      await authService.logout();
      dispatch(logout());
      console.log('✅ Logout successful');
      
      // Redirect to home page after logout
      navigate('/');
      
    } catch (error) {
      console.error('❌ Logout failed:', error);
      // You could add a toast notification here
    } finally {
      setIsLoading(false);
    }
  };

  // Size classes
  const sizeClasses = {
    small: 'px-4 py-1.5 text-sm',
    medium: 'px-6 py-2 text-base',
    large: 'px-8 py-3 text-lg'
  };

  // Variant classes
  const variantClasses = {
    solid: 'bg-red-600 text-white hover:bg-red-700 border border-red-600',
    outline: 'bg-transparent text-red-600 border border-red-600 hover:bg-red-50',
    ghost: 'bg-transparent text-red-600 hover:bg-red-50 border-transparent'
  };

  const baseClasses = `
    inline-flex items-center justify-center gap-2 
    rounded-lg font-medium 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
  `;

  return (
    <button
      onClick={logoutHandler}
      disabled={isLoading}
      className={baseClasses}
      aria-label="Logout"
    >
      {isLoading ? (
        <>
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          Logging out...
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </>
      )}
    </button>
  );
};

export default LogoutBtn;