import { useRef } from "react";
import "./register.css"
import axios from "axios";
import {useNavigate} from "react-router-dom";




export default function Register() {
      const username=useRef();
      const email=useRef();
      const password=useRef();
      const passwordAgain=useRef();
      const navigate= useNavigate();

      const handleLoginbutton =()=>{
              navigate("/login")
      }
      
  
       const handleClick=async(e)=>{
           e.preventDefault();
           if(passwordAgain.current.value!== password.current.value){
            password.current.setCustomValidity("password don't match")
           }else{
            const user={
              username:username.current.value,
              email:email.current.value,
              password:password.current.value,
            }
            try{
              await axios.post("/auth/register" ,user);
              navigate("/login");
            }catch(err){
              console.log(err);
            }
            

           }
     
         
         }
  
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
            <h3 className="loginLogo">SlamBook</h3>
            <span className="loginDesc">
                Connect with friends and the world around you on SlamBook.
            </span>
        </div>
        <div className="loginRight">
            <form className="loginBox" onSubmit={handleClick}>
                  <input placeholder="Username"  required ref={username} className="loginInput" />
                  <input placeholder="Email" type="email" required ref={email}  className="loginInput" />
                  <input placeholder="Password" type="password" required ref={password} className="loginInput" />
                  <input placeholder="Confirm Password" type="password" minLength="6" required ref={passwordAgain} className="loginInput" />
                  <button className="loginButton">Sign Up</button>
                  <button className="loginRegisterButton" onClick={handleLoginbutton}>Log into account</button>
            </form>
        </div>
      </div>
    </div>
  )
}



