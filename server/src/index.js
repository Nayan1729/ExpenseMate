import app from "./app.js";
import dotenv from "dotenv"
import connectDB from "./db/index.js";
dotenv.config({
    path: ".env"
})
const PORT  = process.env.PORT ;
connectDB()
    .then(()=>{
                app.listen(PORT,()=>{
                    console.log(`Server listening at http://localhost:${PORT}`);
                })
    })
    .catch(error=>{
        console.log(`errorrrrrr!!!!!${error}`);
    })
