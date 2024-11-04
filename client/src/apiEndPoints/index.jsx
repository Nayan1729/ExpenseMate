import axios from "axios"
const base_url = "http://localhost:3000"
export const signUpApi = async(values)=>{
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
        return {success:true,message:userResponse.data};
        return {success:false,message:userResponse.message};
        
    } catch (error) {
        console.log("error fetching the userr");
        
    }
}