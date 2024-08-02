
const { z } = require("zod");






//create an object schema 
const signupSchema = z.object({
    username: z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{ message: "Name must be atleast of 3 charaters "})
    .max(255,{message:"Name must not be more than 255 characters"}),
    email: z
    .string({required_error:"Email is required"})
    .trim()
    .email({message :"Invalid email"})
    .min(3,{ message: "Email must be atleast of 3 charaters "})
    .max(255,{message:"Email must not be more than 255 characters"}),  
    phone: z
    .string({required_error:"Phone is required"})
    .trim()
    .min(10,{ message: "Phone must be atleast of 10 charaters "})
    .max(255,{message:"Phone must not be more than 20 characters"}),
    password: z
    .string({required_error:"Password is required"})
    .trim()
    .min(7,{ message: "Password must be atleast of 7 charaters "})
    .max(1024,{message:"Password must not be more than 1024 characters"}),

});



const loginSchema =  z.object ({
    email: z
    .string({required_error:"Email is required"}),
    password: z
    .string({required_error:"Password is required"})
});
module.exports = {signupSchema , loginSchema};