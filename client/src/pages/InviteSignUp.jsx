import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom';
import {verifyInvitaionToken} from '../apiEndPoints/index'
import {Loader} from "../components/index"
import { useNavigate } from 'react-router-dom';
function InviteSignUp() {
  const [isTokenValid, setIsTokenValid] = useState(null);
  const [error,setError] = useState("")
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate()
  
  const token = query.get("token");
/*
  With useEffect: You can easily handle asynchronous logic (like the API call) without blocking the render process. 
  This is important for keeping the UI responsive while the API call is in progress.

  Without useEffect: If you handle the API call directly in the Invite function, it will block the render process and potentially
  cause issues with the component's state updates, leading to unwanted behavior (e.g., flickering or multiple API calls).
*/
    useEffect(()=>{
      async function validateToken() {
        setError("");
        if(token){
          try {
            const res = await verifyInvitaionToken(token);
            console.log(res);
            
            if(res.success){
              setIsTokenValid(true);
              console.log("Inside validateToken funtion in InviteSignUp:"+ isTokenValid);
              
            }
            else{
              setError(res.data.message)
              setIsTokenValid(false)
            }
          } catch (error) {
            setError(error.message)
            setIsTokenValid(false);
          }
        }
      }
      validateToken();
    },[])
    
    if(isTokenValid==null){
      return <Loader/>
    }
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full text-center">
    {isTokenValid ? (
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">You've been invited to join ExpenseMate!</h2>
        <button
          onClick={() => {
            console.log("Button clicked token:"+token);
            console.log(isTokenValid);
            
            navigate(`/register?token=${token}`);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
        >
          Accept Invitation
        </button>
      </div>
    ) : (
      <p className="text-red-600 text-lg font-medium">{error}</p>
    )}
  </div>
</div>

  );
}


export default InviteSignUp;

/*
const location = useLocation();
This line initializes the location constant by calling useLocation(), a hook from React Router.
useLocation() provides access to the current URL’s details within your component, returning a location object that includes properties such as pathname, search, and hash.
Here, location.search is important because it contains the query parameters part of the URL (anything after the ?). For example, in the URL http://localhost:5173/invite?token=yourGeneratedTokenHere, location.search would be "?token=yourGeneratedTokenHere".
Using useLocation here is crucial for accessing the token query parameter from the invitation link URL.

const [isValidToken, setIsValidToken] = useState(null);
This line creates a state variable isValidToken and a function setIsValidToken to update its value, initialized to null using the useState hook.
Purpose of isValidToken:
isValidToken is intended to store whether the token retrieved from the URL is valid (true), invalid (false), or still being checked (null).
Initially, null signifies that the validity of the token hasn’t been determined yet (e.g., waiting for a response from the backend).
Purpose of setIsValidToken:
setIsValidToken allows you to update the isValidToken state, such as setting it to true if the backend confirms the token is valid, or to false if it’s invalid or expired.

const query = new URLSearchParams(location.search);
This line creates a URLSearchParams object from location.search.
Purpose of URLSearchParams:
URLSearchParams is a built-in JavaScript utility that makes it easy to work with query strings in URLs.
By passing location.search to it, you create an instance that can parse query parameters in the format ?key=value.
Here, query becomes an object that allows you to retrieve specific query parameter values by key, such as the token.

const token = query.get('token');
This line retrieves the value of the token query parameter from the query object created above.
Purpose of query.get('token'):
query.get('token') checks the query string for a parameter named token and returns its value if found. If there is no token parameter, it returns null.
For example, in the URL http://localhost:5173/invite?token=yourGeneratedTokenHere, query.get('token') would return "yourGeneratedTokenHere" and store it in the token variable.
Why Extract the Token?
The token is essential for validating the invitation. You can now send this token to the backend to verify its authenticity and determine if the invitation is valid, expired, or previously used.

Summary
In combination:

This code snippet first accesses the current URL using useLocation.
It then parses the query parameters to extract the token.
Finally, the extracted token can be used in the component, usually by sending it to the backend for validation and updating isValidToken based on the response.

*/