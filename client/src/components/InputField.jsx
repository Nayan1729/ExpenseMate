import React from 'react';

const InputField = ({ label, name, type, value, onChange, onBlur, error, touched }) => (
    <div className="mb-6">
        <label htmlFor={name} className="block text-gray-700 font-medium mb-2">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={`w-full p-3 border ${touched && error ? 'border-red-500' : 'border-gray-300'} 
                rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400`}
            placeholder={`Enter your ${label.toLowerCase()}`}
        />
        {touched && error ? (
            <div className="text-red-500 text-sm mt-1">{error}</div>
        ) : null}
    </div>
);

export default InputField;
