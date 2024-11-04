import { useState } from 'react';

export default function InviteInput() {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        // setIsValidEmail(validateEmail(emailInput));
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInviteClick = () => {
        setIsValidEmail(validateEmail(email));
        if (isValidEmail) {
            // Perform invite action here
            console.log("Invite sent to:", email);
        } else {
            console.log("Please enter a valid email.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded-md">
            <div className="flex items-center space-x-2">
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter email"
                    className={`w-full px-4 py-2 border ${isValidEmail ? 'border-gray-300' : 'border-red-500'} rounded-md focus:outline-none focus:border-blue-500`}
                />
                <button
                    type="button"
                    onClick={handleInviteClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                >
                    Invite
                </button>
            </div>
            {!isValidEmail && (
                <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email address.
                </p>
            )}
        </div>
    );
}
