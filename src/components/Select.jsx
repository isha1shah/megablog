
const Select = ({ label, options, className, ...props }) => {
    return (
        <div className={className}>
            {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}
            <select 
                {...props}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                {options.map((option) => {
                    // Handle both string and object formats
                    const value = typeof option === 'object' ? option.value : option;
                    const label = typeof option === 'object' ? option.label : option;
                    
                    return (
                        <option key={value} value={value}>
                            {label}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};
export default Select;