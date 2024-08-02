import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import {  toast } from 'react-toastify';

const URL= "http://localhost:5010/api/auth/login";

export const Login =() =>{
    const [user,setUser] = useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();

    const {storeTokenInLS} = useAuth();

     //handling the input value
     const handleInput = (e) =>{
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]:value,
        })
    };
    //handling form submission 
    const handleSubmit=  async (e) =>{
        e.preventDefault();
      try{
     const response = await fetch(URL,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify(user),
     });

     console.log("login form",response);

   const res_data = await response.json();

     if(response.ok){
  
   storeTokenInLS(res_data.token);
        setUser({
            email: "",
            password: "",
        })
        toast.success("Login  successful");
        
        navigate("/service");
    } 
   else {
    toast.error(res_data.extraDetails ? res_data.extraDetails:res_data.message);
   
    } 
  }  catch (error) {
        console.log("register", error);
    }
}

    return (<>
    <section>
        <main>
            <div className="section-registration">
            <div className="container-grid grid-two-cols">
                <div className="login-image">
                    <img src="/image/login.png" alt="login" 
                    width="400" height="500"></img>
                </div>
              
                <div className="registration-form">
                    <h1 className="main-heading mb-3">Login </h1>
                    <br/>
                    <form onSubmit ={handleSubmit}>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input type="email" 
                            name="email"
                            placeholder="email"
                            id="email"
                            required
                            autoComplete="off"
                            value={user.email}
                            onChange={handleInput} 
                            />

                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <input type="password" 
                            name="password"
                            placeholder="password"
                            id="password"
                            required
                            autoComplete="off"
                            value={user.password}
                            onChange={handleInput} 
                            />

                        </div>
                        <br/>
                    <button type="submit" className="btn btn-submit">Login </button>
                    </form>
                </div>


            </div>
            </div>
        </main>
    </section>
    </>)
}