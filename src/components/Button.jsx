import React from "react";


const Button = ({
  children,               
  type = "button",        
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",         
  ...props                
}) => {
  return (
    <button
      type={type} // ensures the correct button type
      className={`
        px-4 py-2 
        rounded-lg 
        font-medium 
        ${bgColor} 
        ${textColor} 
        ${className} 
        shadow-md 
        hover:opacity-90 
        transition duration-200 ease-in-out
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
