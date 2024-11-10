import { useState } from 'react';
import { sendEmailInvite } from '../apiEndPoints';
import { useSelector } from 'react-redux';
import ApiError from '../../../server/src/utilities/ApiError';
export default function InviteInput() {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [message, setMessage] = useState({ text: '', type: '' }); // stores message and type (success or error)
    const senderEmail = useSelector(state=>state.user.user?.email);
    
    
    const handleEmailChange = (e) => {
        const emailInput = e.target.value;
        setEmail(emailInput);
        setIsValidEmail(true); // Reset validation message when typing
        setMessage({ text: '', type: '' }); // Reset message when typing
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleInviteClick = async () => {
        const emailIsValid = validateEmail(email);
        setIsValidEmail(emailIsValid);

        if (emailIsValid) {
            try {
                if(senderEmail==email){
                    throw new ApiError(400,"Can't invite yourself... Change the email ")
                }
                const res = await sendEmailInvite(email);
                if (res.success) {
                    setMessage({ text: 'Invite sent successfully!', type: 'success' });
                    
                } else {
                    setMessage({ text: res.error || 'Failed to send invite.', type: 'error' });
                    console.log("Failed to send invite:", res.error);
                }

                
                setTimeout(() => setMessage({ text: '', type: '' }), 4000);
            } catch (error) {
                setMessage({ text: error.message || 'Something went wrong.', type: 'error' });
                console.log("Error sending invite:", error.message);

                
                setTimeout(() => setMessage({ text: '', type: '' }), 4000);
            }
        } else {
            setMessage({ text: 'Please enter a valid email address.', type: 'error' });
            setTimeout(() => setMessage({ text: '', type: '' }), 4000); 
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
                    className="bg-indigo-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md transition duration-200"
                >
                    Invite
                </button>
            </div>
            {message.text && (
                <p className={`text-sm mt-1 ${message.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                    {message.text}
                </p>
            )}
        </div>
    );
}
