const express  = require("express");
require('dotenv').config();
const app = express();
const router = require("./router/auth-router")
const connectDb = require("./utils/db")
const cors = require("cors");
app.use(express.json());
const corsOptions = {
    origin: String(process.env.FRONTEND_URL), // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  app.use(cors(corsOptions));

app.use("/api/auth",router);

app.get("/", (req,res) =>{
     res.status(200).send("Welcome")
});




const PORT =5000

connectDb().then(() =>{
app.listen(PORT, () =>{
    console.log("server is running on",PORT)
})
});