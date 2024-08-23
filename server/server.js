

require('dotenv').config();
const express = require("express");
const cors = require('cors');
const app = express();
const authRoute = require("./router/auth-router");
const connectDB = require("./util/db");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const errorMiddleware = require("./middlewares/error_middleware");


const corsOption ={
  origin:"http://localhost:5173",
  methods:"GET , POST, PUT, DELETE, PATCH, HEAD",
 Credentials:true,
}

//handling cor
app.use(cors(corsOption));




app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data", serviceRoute);

 //lets define admin router
app.use("/api/admin", adminRoute);

app.use(errorMiddleware);

const PORT = 5010;

connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
  });
});