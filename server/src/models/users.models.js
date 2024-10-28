import mongoose,{model} from "mongoose"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim : true,
        lowercase:true,
        unique:true,
        index:true
    },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobileNo:{
    type:String
  },
   password: {
        type: String,
        required: function () { return this.provider === 'local'; }, // Required only for traditional login
    },
  auth0Id: {
    type: String, // Google-specific identifier
    unique: true,
    sparse: true, // Allows null values for traditional logins
  },
  provider: {
    type: String,
    enum: ['local', 'google'], // Specifies whether it's traditional or Google login
    required: true
},
  refreshToken: {
    type: String, // Refresh token for JWT (traditional login)
  },
  googleRefreshToken: {
    type: String, // Refresh token for Google OAuth
  },
},{timestamps:true});

userSchema.pre("save", async function (next){
    if(!this.isModified("password"))    return next(); //This is to make sure that password is modified.
    
    // If this check is not done then what happens is that this hook will be called everytime any detail is saved 
    this.password = await bcrypt.hash(this.password,10) // This 10 indicates the number of rounds to encrypt. Read Docs
    console.log("password"+this.password);
  
    next();
}) // similar to write as app.listen 

userSchema.methods.isPasswordCorrect = async function (password){ // This is how we make custom methods for userSchema 
  console.log(this.password);
  console.log(password);
  
  
  if (!password || !this.password) {
    console.error("Missing password for comparison");
    return false; // Return false if any password is missing
}
return await bcrypt.compare(password, this.password); // This bcrypt's compare method asks for password entered and the encrypted password
                                                         // we have stored in db 
}
// JWT is a bearer token . Whosoever has this token can get the requested data
// Make sure this isnt a arrow function as it doesnt have ref to "this"
userSchema.methods.generateAccessToken = function() {
  console.log("User object:", this);
  
  try {
      return jwt.sign(
          {
              _id: this._id,
              email: this.email,
              username: this.username,
          },
          process.env.ACCESS_TOKEN_SECRET,
          {
              expiresIn: process.env.ACCESS_TOKEN_EXPIRY
          }
      );
  } catch (error) {
      console.error("Error generating access token:", error);
      throw new Error("Token generation failed"); // or handle as you see fit
  }
}
// The way we write this is by passing payload object(data),Accesstoken string and expiresIn as object
    userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
            _id : this._id,   // This is a payload(data) 
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn : process.env.REFRESH_TOKEN_EXPIRY
        }
    )}
export const User = model("User",userSchema);


