import axios from "axios"
import conf from "../conf/conf_contacts"
const base_url = conf.baseUrl;

/*
    When a Path Parameter Would Make Sense
    Use a path parameter if the token uniquely identifies a resource, such as invite/:token, and you expect the token to always be present 
    in the URL (for example, if it’s critical for navigation or routing). However, in cases like invitations, where the token is primarily 
    supplemental data, a query parameter is typically better suited.
    
*/


//User API's
export const signUpApi = async(values)=>{
    console.log("BAseURL:"+base_url);
try {
        const res = await axios.post(`${base_url}/api/v1/users/register`,{
            username : values.username,
            email:values.email,
            password:values.password,
            mobileNo:values.mobileNo
        },{ withCredentials: true })
        return {success:true,message:res.data};
} catch (error) {
        return {success:false,error:error.message}
    }
}

export const loginApi = async(values)=>{
    try {
            const res = await axios.post(`${base_url}/api/v1/users/login`,{
                email:values.email,
                password:values.password,
            },{ withCredentials: true })
            console.log("LoginApi: "+res);
            
            return {success:true,data:res.data};
    } catch (error) {
            return {success:false,error:error.message}
        }
}

export const getCurrentUser = async()=>{
    try {
        const userResponse = await axios.post(`${base_url}/api/v1/users/getCurrentUser`, {}, { withCredentials: true });
        
        
        if(userResponse.data)
        return {success:true,data:userResponse.data.data};
        return {success:false,message:userResponse.message};
        
    } catch (error) {
        console.log("error fetching the userr");
        
    }
}



//Invitation API's
export const sendEmailInvite = async(email)=>{
    try {
        const res = await axios.post(`${base_url}/api/v1/invite/sendInviteEmail`,{
            email
        },{withCredentials:true})
        return {success:true,data:res.data};
        
    } catch (error) {
        return {success:false,error:error.message};
    }
}
export const verifyInvitaionToken = async(token)=>{
    try {
        console.log("Invite verifyInvitationTOken in  apiEndPoint");
        
        const res = await axios.get(`${base_url}/api/v1/invite/verifyInvitationToken/${token}`)
        console.log("Inside the verifyInvitation Token in index.jsx in apiEndPoints");
        
        if(res.statusText=="OK"){
            return {success:true,data:res.data.data}
        }
        else{
            return {success:false,message:res.data.message}
        }
    } catch (error) {
        return {success:false,message:error.message}
    }
}

export const acceptInvitaion = async (token)=>{
        try {
            console.log("Inside the accept invitation in the api");
            
            const res = await axios.post(`${base_url}/api/v1/invite/acceptInvitation`,{
                token
            },{withCredentials:true})
            console.log(res);
            
            if(res.statusText=="OK"){
                return {success:true,data:res.data.data};
            }
            else{
                return {success:false,message:res.data.message}
            }
        } catch (error) {
            return {success:false,message:error.message}
        }
}

// Friendship API's
export const createFriendship = async (user1,user2)=>{
    try {
        console.log("inside the createFriendship of api");
        
        const res = await axios.post(`${base_url}/api/v1/friend/createFriendship`,{user1,user2},{withCredentials:true})
        console.log("inside the createFriendship of api");
        console.log(res);
        
        if(res.statusText=="Created"){
            return{success:true,data:"Friendship created successfully"};
        }
        else{
            return{success:false,message:"Couldnt create Friendship"};
        }
    } catch (error) {
        return{success:false,message:error.message};
    }
}