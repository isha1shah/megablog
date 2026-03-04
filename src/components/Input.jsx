import React, { useId } from 'react'


const Input = React.forwardRef(function Input(
  {
    label,            
    type = "text",    
    className = "",   
    ...props          
  },
  ref
) {
  const id = useId() 

  return (
    <div className="w-full flex flex-col">
     
      {label && (
        <label
          htmlFor={id}
          className="mb-1 pl-1 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      
      <input
        type={type}
        ref={ref}
        id={id}
        className={`
          w-full px-3 py-2 
          rounded-lg border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 
          text-gray-800 placeholder-gray-400
          transition duration-200
          ${className}   
        `}
        {...props}
      />
    </div>
  )
})

export default Input
