import React, {useState}from 'react'
import { Link } from "react-router-dom";
import { Icon } from "react-icons-kit";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import { eye } from "react-icons-kit/feather/eye";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");
  const [icon, setIcon] = useState(eyeOff);
  const handleToggle = () => {
    if (type === "password") {
      setIcon(eye);
      setType("text");
    } else {
      setIcon(eyeOff);
      setType("password");
    }
  };
  const [userLoginInfo , setUserLoginInfo] = useState({
    email:"",
    password:"",
  });
  function onChangeHandlerEmailLogin(event){
    setUserLoginInfo({ ...userLoginInfo, email: event.target.value });
  }
  function onChangeHandlerPasswordLogin(event){
    setUserLoginInfo({ ...userLoginInfo, password: event.target.value });
  }
  function LogInUser(){
    const userUrllogin = "http://localhost:5125/api/v1/Users/signIn";
    axios
      .post(userUrllogin, userLoginInfo)
      .then((res) => {
        console.log(res.data , "user loged in seccessfuly")
        if(res.status === 200){
           const token = res.data; // Replace with actual property name
           if (token) {
             localStorage.setItem("token", token);
           } else {
             console.error("Token not found in response data");
           }
        }
      })
      .catch((err) => {
        console.log(err, "err from post");
        if (err.status === 400) {
          if (err.response.data.message) {
            alert(err.response.data.message);
            return;
          }
        }
      });
  }
   return (
     <div>
       <div className="signupdiv">
         <h3>Sign In</h3>

         <form className="registerform">
           <input
             type="text"
             placeholder="Email"
             required
             onChange={onChangeHandlerEmailLogin}
           />
           <div className="revelpass">
             <input
               type={type}
               placeholder="Password"
               value={password}
               onChange={(event) => {
                 setPassword(event.target.value);
                 onChangeHandlerPasswordLogin(event); // Pass the event object to the function
               }}
               autoComplete="current-password"
             />
             <span
               class="flex justify-around items-center"
               onClick={handleToggle}
             >
               <Icon class="absolute mr-10" icon={icon} size={25} />
             </span>
           </div>
           <input
             type="button"
             onClick={LogInUser}
             value="Sign In"
             className="createbutton"
           />
         </form>
         <hr className="signinhr" />
         <div className="forgotandsing">
           <Link>
             <p>Forgot Your Password?</p>
           </Link>
           <Link to="/register">
             <p>Sign Up</p>
           </Link>
         </div>
       </div>
     </div>
   ); 
}
