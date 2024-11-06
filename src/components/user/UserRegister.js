import React, {useState} from 'react'
import './UserStyle.css';
import { Link } from "react-router-dom";
import axios from "axios";
export default function UserRegister() {
    const [userInfo , setUserInfo] = useState({username: "" , firstname: "" , lastname:"", birthdate:"",email:"",password:"", phonenumber:0});
  //url: http://localhost:5125/api/v1/users/register
 const [selectedDate, setSelectedDate] = useState(null);
const [email, setEmail] = useState("");
const [emailError, setEmailError] = useState("");
 const handleDateChange = (event) => {
   setSelectedDate(event.target.value);
 };
 function onChangeHandlerUsername(event) {
    setUserInfo({ ...userInfo, username: event.target.value});
 }
function onChangeHandlerPhoneNumber(event) {
  setUserInfo({ ...userInfo, phonenumber: event.target.value });
}
 function onChangeHandlerFirstname(event) {
   setUserInfo({ ...userInfo, firstname: event.target.value });
 }
 function onChangeHandlerLastname(event) {
   setUserInfo({ ...userInfo, lastname: event.target.value });
 }
 function onChangeHandlerBirthdate(event) {
   setUserInfo({ ...userInfo, birthdate: event.target.value });
 }
  const onChangeHandlerEmail = (event) => {
    const newEmail = event.target.value;

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
      setUserInfo({ ...userInfo, email: newEmail });
    }

    // Update userInfo state only if email is valid
  };
  function onChangeHandlerPassword(event) {
    setUserInfo({ ...userInfo, password: event.target.value });
  }
  function registNewUser(){
    const userUrl = "http://localhost:5125/api/v1/Users/register";
    axios.post(userUrl , userInfo)
    .then((res) => console.log(res , "res from post"))
    .catch((err) => {
        console.log(err , "err from post");
        if(err.status === 400){
            if (err.response.data.errors.password) {
              alert(err.response.data.errors.password[0]);
              return;
            }
            if (err.response.data.errors.Email) {
              alert(err.response.data.errors.Email[0]);
              return;
            }
        }

    });
  }
  
  return (
    <div>
      <div className="signupdiv">
        <h3>Sign Up</h3>
        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="signinlink">Sign in</span>
          </Link>
        </p>
        <div className="formdiv">
          <form className="registerform">
            <label for="UserName">User Name :</label>
            <input type="text" onChange={onChangeHandlerUsername} required />
            <label for="first name">First Name :</label>
            <input type="text" required onChange={onChangeHandlerFirstname} />
            <label for="last name">Last Name :</label>
            <input type="text" required onChange={onChangeHandlerLastname} />
            <label for="phone number">Phone Number :</label>
            <input type="text" required onChange={onChangeHandlerPhoneNumber} />
            <label for="birthdate">Birth Date:</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(handleDateChange, onChangeHandlerBirthdate)}
              required
            />
            <label for="email">Email :</label>
            <input
              type="text"
              
              required
              onChange={onChangeHandlerEmail}
            />
            {emailError && <p style={{ color: "red" }}>{emailError}</p>}
            <label for="password">Password:</label>
            <input
              type="password"
              required
              onChange={onChangeHandlerPassword}
            />
            <button className="createbutton" onClick={registNewUser}>
              CREATE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
