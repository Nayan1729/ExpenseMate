import React from 'react';

const InputField = ({ label, name, type, value, onChange, onBlur, error, touched, ...props }) => (
    <div className="mb-4">
        <label htmlFor={name} className="block text-gray-700 font-medium mb-1 text-sm">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            {...props}  
            className={`w-full p-2 border ${touched && error ? 'border-red-500' : 'border-gray-300'} 
                rounded focus:outline-none focus:ring-1 focus:ring-blue-400 text-sm`}
            placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {touched && error ? (
            <div className="text-red-500 text-xs mt-1">{error}</div>
        ) : null}
    </div>
);

export default InputField;
