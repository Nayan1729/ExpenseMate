import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
const app = new express();
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true
}))
app.use(express.json({limit:"16kb"})); 
app.use(express.urlencoded({extended:true,limit:"16kb"})); 

app.use(express.static("public"));
app.use(cookieParser());

// User routes
import userRouter from "./routes/user.routes.js";
app.use("/api/v1/users",userRouter);    

//Invitation routes
import invitationRouter from "./routes/invitation.routes.js"
app.use("/api/v1/invite",invitationRouter);


// Friend routed
import friendRouter from "./routes/friend.routes.js";
app.use("/api/v1/friend",friendRouter);

export default app;
