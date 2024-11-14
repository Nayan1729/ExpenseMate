import React from 'react'
import { useSelector } from 'react-redux';
function PayerDialog({formik,setIsPayerDialogOpen}) {
  const currentUsername = useSelector(state=>state.user.user.username)
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
        <h3 className="text-lg font-medium mb-4">Select Payer</h3>
        <div className="space-y-2">
          {/* Add 'You' as the first item and map over selected friends */}
          {["You", ...formik.values.selectedFriends].filter((username)=>username!=currentUsername).map((friend, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                name="payer"
                value={ friend} // Use friend's _id or the username if it's a string
                checked={formik.values.payer === ( friend)} // Match the payer value correctly
                onChange={(e) => {
                  formik.setFieldValue('payer', e.target.value);
                }}
              />
              <label htmlFor={friend} className="ml-2">{ friend}</label> {/* Display friend.username or friend */}
            </div>
          ))}
        </div>
        <button 
          type="button"
          onClick={() => setIsPayerDialogOpen(false)}
          className="mt-4 px-4 py-2 bg-gray-200 rounded text-gray-600 hover:bg-gray-300"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export default PayerDialog